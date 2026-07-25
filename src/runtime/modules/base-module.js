import { ModuleInterface } from '../interfaces/module-interface.js';

/**
 * BaseModule Class
 */
export class BaseModule extends ModuleInterface {
  constructor() {
    super();
    this.name = this.constructor.name;
    this.context = null;
    this.status = 'uninitialized';
  }

  initialize(context) {
    this.context = context;
    this.status = 'initialized';
    console.log(`[Module Manager] Module "${this.name}" initialized.`);
  }

  boot() {
    this.status = 'booted';
    console.log(`[Module Manager] Module "${this.name}" booted.`);
  }

  start() {
    this.status = 'running';
    console.log(`[Module Manager] Module "${this.name}" started.`);
  }

  stop() {
    this.status = 'stopped';
    console.log(`[Module Manager] Module "${this.name}" stopped.`);
  }

  destroy() {
    this.status = 'destroyed';
    this.context = null;
    console.log(`[Module Manager] Module "${this.name}" destroyed.`);
  }
}
