/**
 * ValidationMiddleware
 */
export class ValidationMiddleware {
  async handle(command, context, next) {
    const val = command.validate(command.args, command.options);
    if (!val.isValid) {
      throw new Error(`[Command Validation Error] Invalid arguments: ${val.errors.join(', ')}`);
    }
    return next();
  }
}
