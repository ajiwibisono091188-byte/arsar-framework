/**
 * AIQueue Class
 * Manages async batch execution queues
 */
export class AIQueue {
  constructor() {
    this.tasks = [];
    this.running = false;
  }

  /**
   * Add a new generation task to the queue
   * @param {Function} taskFn Async task function
   */
  enqueue(taskFn) {
    this.tasks.push(taskFn);
  }

  /**
   * Process all queued tasks sequentially
   * @returns {Promise<Array>} Array of results
   */
  async processAll() {
    if (this.running) return [];
    this.running = true;
    const results = [];

    console.log(`[AI Queue] Processing ${this.tasks.length} tasks in queue...`);

    while (this.tasks.length > 0) {
      const task = this.tasks.shift();
      try {
        const result = await task();
        results.push({ success: true, data: result });
      } catch (err) {
        results.push({ success: false, error: err.message });
      }
    }

    this.running = false;
    return results;
  }
}
