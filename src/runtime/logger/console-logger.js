import { LoggerInterface } from '../interfaces/logger-interface.js';

/**
 * ConsoleLogger Implementation
 */
export class ConsoleLogger extends LoggerInterface {
  constructor(minLevel = 'info') {
    super();
    this.levels = { debug: 0, info: 1, warn: 2, error: 3, fatal: 4 };
    this.minLevel = minLevel;
  }

  shouldLog(level) {
    return this.levels[level] >= this.levels[this.minLevel];
  }

  debug(message, ...args) {
    if (this.shouldLog('debug')) {
      console.log(`[DEBUG] ${message}`, ...args);
    }
  }

  info(message, ...args) {
    if (this.shouldLog('info')) {
      console.info(`[INFO] ${message}`, ...args);
    }
  }

  warn(message, ...args) {
    if (this.shouldLog('warn')) {
      console.warn(`[WARN] ${message}`, ...args);
    }
  }

  error(message, ...args) {
    if (this.shouldLog('error')) {
      console.error(`[ERROR] ${message}`, ...args);
    }
  }

  fatal(message, ...args) {
    if (this.shouldLog('fatal')) {
      console.error(`[FATAL] ${message}`, ...args);
    }
  }
}
