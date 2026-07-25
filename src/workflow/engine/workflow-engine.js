import { WorkflowEngineInterface } from '../interfaces/workflow-engine-interface.js';
import { WorkflowRunner } from '../runner/workflow-runner.js';
import { WorkflowValidator } from '../validation/workflow-validator.js';
import { LoadProjectStep, LoadKnowledgeStep, GenerateAIContentStep, ComposeBlueprintStep, RenderStep, GenerateSEOStep, DeployStep } from '../actions/action-placeholder.js';

/**
 * WorkflowEngine Class
 */
export class WorkflowEngine extends WorkflowEngineInterface {
  /**
   * @param {Object} eventBus Optional EventBus for triggers
   */
  constructor(eventBus = null) {
    super();
    this.eventBus = eventBus;
    this.workflows = new Map(); // id -> definition
    this.activeRunners = new Map(); // instanceId -> WorkflowRunner
    this.stepsMap = new Map();
    this.initDefaultSteps();
  }

  initDefaultSteps() {
    const list = [
      new LoadProjectStep(),
      new LoadKnowledgeStep(),
      new GenerateAIContentStep(),
      new ComposeBlueprintStep(),
      new RenderStep(),
      new GenerateSEOStep(),
      new DeployStep()
    ];
    list.forEach((step) => this.stepsMap.set(step.id, step));
  }

  registerWorkflow(def) {
    const validation = WorkflowValidator.validate(def);
    if (!validation.isValid) {
      throw new Error(`[Workflow Engine] Workflow definition is invalid: ${validation.errors.join(', ')}`);
    }
    this.workflows.set(def.id, def);
  }

  /**
   * Instantiate and run workflow definition
   * @param {String} workflowId Registered workflow ID
   * @param {Object} context 
   * @returns {Object} { runnerId, promise }
   */
  run(workflowId, context = {}) {
    const def = this.workflows.get(workflowId);
    if (!def) {
      throw new Error(`[Workflow Engine Error] Workflow "${workflowId}" not found.`);
    }

    const runner = new WorkflowRunner(def, this.stepsMap, this.eventBus);
    const runnerId = 'run_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);
    
    this.activeRunners.set(runnerId, runner);

    const promise = runner.execute(context);
    return { runnerId, promise };
  }

  pause(runnerId) {
    const runner = this.activeRunners.get(runnerId);
    if (runner) runner.pause();
  }

  resume(runnerId) {
    const runner = this.activeRunners.get(runnerId);
    if (runner) return runner.resume();
    return Promise.reject(new Error('Runner not found.'));
  }

  cancel(runnerId) {
    const runner = this.activeRunners.get(runnerId);
    if (runner) runner.cancel();
  }

  retry(runnerId) {
    const runner = this.activeRunners.get(runnerId);
    if (runner) return runner.retryStep();
    return Promise.reject(new Error('Runner not found.'));
  }

  status(runnerId) {
    const runner = this.activeRunners.get(runnerId);
    return runner ? runner.state.status : 'unknown';
  }
}
export const workflowEngine = new WorkflowEngine();
