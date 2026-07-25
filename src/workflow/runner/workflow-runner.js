import { WorkflowState } from '../state/workflow-state.js';

/**
 * WorkflowRunner Class
 */
export class WorkflowRunner {
  /**
   * @param {Object} definition Workflow definition JSON template
   * @param {Map} stepsMap Map of stepId -> StepInstance
   * @param {Object} eventBus Optional EventBus
   */
  constructor(definition, stepsMap, eventBus = null) {
    this.definition = definition;
    this.stepsMap = stepsMap;
    this.eventBus = eventBus;
    this.state = new WorkflowState(definition.id);
    this.currentStepIndex = 0;
    this.context = {};
  }

  /**
   * Helper to emit event signals
   */
  emit(event, ...args) {
    if (this.eventBus) {
      this.eventBus.emit(event, ...args);
    } else {
      console.log(`[Workflow Runner Event] ${event}:`, ...args);
    }
  }

  /**
   * Start executing workflow sekuensial
   */
  async execute(context = {}) {
    this.context = context;
    this.state.start();
    this.emit('workflow.started', this.state.workflowId);

    const steps = this.definition.steps;

    while (this.currentStepIndex < steps.length) {
      // 1. Check if paused
      if (this.state.status === 'paused') {
        console.log('[Workflow Runner] Run loop paused. Waiting for resume signal...');
        return this.context;
      }

      // 2. Check if cancelled
      if (this.state.status === 'cancelled') {
        console.log('[Workflow Runner] Run loop cancelled.');
        return this.context;
      }

      const stepId = steps[this.currentStepIndex];
      const stepInstance = this.stepsMap.get(stepId);

      if (!stepInstance) {
        throw new Error(`[Workflow Runner Error] Step instance "${stepId}" not found in map registry.`);
      }

      this.state.currentStep = stepId;
      this.emit('step.started', stepId);

      try {
        // Execute step
        this.context = await stepInstance.execute(this.context);
        
        this.state.completedSteps.push(stepId);
        this.state.updateProgress(steps.length);
        this.emit('step.completed', stepId);
        
        this.currentStepIndex++;
      } catch (err) {
        this.emit('step.failed', stepId, err.message);
        
        // Handle failure: try rollback
        this.state.fail(stepId);
        await this.rollback(this.currentStepIndex);
        
        this.emit('workflow.failed', this.state.workflowId, err.message);
        throw err;
      }
    }

    this.state.complete();
    this.emit('workflow.completed', this.state.workflowId, this.context);
    return this.context;
  }

  /**
   * Rollback completed steps in reverse LIFO order
   */
  async rollback(failIndex) {
    console.log('[Workflow Runner] Starting rollback pipeline...');
    const steps = this.definition.steps;
    for (let i = failIndex - 1; i >= 0; i--) {
      const stepId = steps[i];
      const stepInstance = this.stepsMap.get(stepId);
      if (stepInstance && typeof stepInstance.rollback === 'function') {
        try {
          this.context = await stepInstance.rollback(this.context);
        } catch (rollbackErr) {
          console.error(`[Workflow Rollback Error] Failed to rollback step "${stepId}":`, rollbackErr.message);
        }
      }
    }
  }

  pause() {
    this.state.pause();
  }

  resume() {
    this.state.resume();
    // Continue loop
    return this.execute(this.context);
  }

  cancel() {
    this.state.cancel();
  }

  skipStep() {
    console.log(`[Workflow Runner] Skipping step: ${this.definition.steps[this.currentStepIndex]}`);
    this.currentStepIndex++;
    return this.execute(this.context);
  }

  /**
   * Force retry current step
   */
  retryStep() {
    console.log(`[Workflow Runner] Retrying step index: ${this.currentStepIndex}`);
    return this.execute(this.context);
  }
}
