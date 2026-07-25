/**
 * Module Interface Definition
 */
export class ModuleInterface {
  initialize(context) {
    throw new Error('Method "initialize()" must be implemented.');
  }

  boot() {
    throw new Error('Method "boot()" must be implemented.');
  }

  start() {
    throw new Error('Method "start()" must be implemented.');
  }

  stop() {
    throw new Error('Method "stop()" must be implemented.');
  }

  destroy() {
    throw new Error('Method "destroy()" must be implemented.');
  }
}
