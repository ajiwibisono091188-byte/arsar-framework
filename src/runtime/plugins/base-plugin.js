import { PluginInterface } from '../interfaces/plugin-interface.js';

/**
 * BasePlugin Class
 */
export class BasePlugin extends PluginInterface {
  constructor() {
    super();
    this.name = this.constructor.name;
  }

  install(kernel) {
    console.log(`[Plugin Manager] Plugin "${this.name}" installed.`);
  }

  uninstall(kernel) {
    console.log(`[Plugin Manager] Plugin "${this.name}" uninstalled.`);
  }

  metadata() {
    return {
      name: this.name,
      version: '1.0.0',
      description: 'Base Plugin template'
    };
  }
}
