/**
 * Logger Interface Definition
 */
export class LoggerInterface {
  debug(message, ...args) {
    throw new Error('Method "debug()" must be implemented.');
  }

  info(message, ...args) {
    throw new Error('Method "info()" must be implemented.');
  }

  warn(message, ...args) {
    throw new Error('Method "warn()" must be implemented.');
  }

  error(message, ...args) {
    throw new Error('Method "error()" must be implemented.');
  }

  fatal(message, ...args) {
    throw new Error('Method "fatal()" must be implemented.');
  }
}
