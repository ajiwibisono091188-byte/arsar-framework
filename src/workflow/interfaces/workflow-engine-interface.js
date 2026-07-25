/**
 * Workflow Engine Interface
 */
export class WorkflowEngineInterface {
  registerWorkflow(def) {
    throw new Error('Method "registerWorkflow()" must be implemented.');
  }

  run(workflowId, context) {
    throw new Error('Method "run()" must be implemented.');
  }

  pause(workflowId) {
    throw new Error('Method "pause()" must be implemented.');
  }

  resume(workflowId) {
    throw new Error('Method "resume()" must be implemented.');
  }

  cancel(workflowId) {
    throw new Error('Method "cancel()" must be implemented.');
  }
}
