/**
 * WorkflowState Class
 * Manages tracking variables of a running workflow instance
 */
export class WorkflowState {
  constructor(workflowId) {
    this.workflowId = workflowId;
    this.status = 'pending'; // pending, running, paused, completed, failed, cancelled
    this.currentStep = null;
    this.completedSteps = [];
    this.failedSteps = [];
    this.progress = 0;
    this.startedAt = null;
    this.finishedAt = null;
  }

  start() {
    this.status = 'running';
    this.startedAt = new Date().toISOString();
  }

  pause() {
    this.status = 'paused';
  }

  resume() {
    this.status = 'running';
  }

  complete() {
    this.status = 'completed';
    this.progress = 100;
    this.finishedAt = new Date().toISOString();
  }

  fail(stepId) {
    this.status = 'failed';
    this.failedSteps.push(stepId);
    this.finishedAt = new Date().toISOString();
  }

  cancel() {
    this.status = 'cancelled';
    this.finishedAt = new Date().toISOString();
  }

  updateProgress(totalSteps) {
    if (totalSteps > 0) {
      this.progress = Math.round((this.completedSteps.length / totalSteps) * 100);
    }
  }
}
