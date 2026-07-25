/**
 * RetryManager Class
 * Executes async tasks with exponential backoff retry cycles
 */
export class RetryManager {
  /**
   * Run callback function with retries
   * @param {Function} fn Async function returning a promise
   * @param {Number} maxAttempts 
   * @param {Number} baseDelayMs 
   * @returns {Promise<Any>} Resolves if success
   */
  static async execute(fn, maxAttempts = 3, baseDelayMs = 50) {
    let attempt = 0;
    while (attempt < maxAttempts) {
      try {
        return await fn();
      } catch (error) {
        attempt++;
        if (attempt >= maxAttempts) {
          throw new Error(`[Retry Manager] Execution failed after ${maxAttempts} attempts. Last error: ${error.message}`);
        }

        const delay = Math.pow(2, attempt) * baseDelayMs;
        console.log(`[Retry Manager] Attempt ${attempt} failed. Retrying in ${delay}ms... Reason: ${error.message}`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }
}
