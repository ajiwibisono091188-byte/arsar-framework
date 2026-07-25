/**
 * WorkflowQueue Class
 */
export class WorkflowQueue {
  constructor() {
    this.queue = [];
  }

  push(runner) {
    this.queue.push(runner);
  }

  pop() {
    return this.queue.shift();
  }

  list() {
    return this.queue;
  }
}
