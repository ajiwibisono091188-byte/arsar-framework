/**
 * RuntimeContext Class
 */
export class RuntimeContext {
  constructor(options = {}) {
    this.project = options.project || process.env.VITE_ARSAR_PROJECT || 'default';
    this.environment = options.environment || process.env.VITE_APP_ENV || 'development';
    this.version = options.version || '2.0.0';
    this.workingDirectory = options.workingDirectory || process.cwd();
  }
}
