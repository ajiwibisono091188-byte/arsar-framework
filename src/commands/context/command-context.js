/**
 * CommandContext Class
 */
export class CommandContext {
  constructor(runtime = null, project = null, config = {}) {
    this.runtime = runtime;
    this.project = project;
    this.config = config;
    this.logger = console;
    this.env = typeof process !== 'undefined' ? process.env : {};
  }
}
