/**
 * PerformanceMiddleware
 * Measures command execution time
 */
export class PerformanceMiddleware {
  async handle(command, context, next) {
    const start = Date.now();
    const result = await next();
    const duration = Date.now() - start;
    console.log(`[Command Bus] Performance benchmark for "${command.id}": ${duration}ms`);
    return result;
  }
}
