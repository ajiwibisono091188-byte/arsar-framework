/**
 * LoggingMiddleware
 */
export class LoggingMiddleware {
  async handle(command, context, next) {
    console.log(`[Command Bus] Dispatching: "${command.id}"`);
    const result = await next();
    console.log(`[Command Bus] Finished: "${command.id}"`);
    return result;
  }
}
