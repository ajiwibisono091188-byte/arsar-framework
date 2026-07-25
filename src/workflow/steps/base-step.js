import { StepInterface } from '../interfaces/step-interface.js';

/**
 * BaseStep Class
 */
export class BaseStep extends StepInterface {
  constructor(id, name) {
    super();
    this.id = id;
    this.name = name;
  }

  execute(context) {
    console.log(`[Step Runner] Executing step: "${this.name}"`);
    return Promise.resolve(context);
  }

  rollback(context) {
    console.log(`[Step Runner] Rolling back step: "${this.name}"`);
    return Promise.resolve(context);
  }

  validate(context) {
    return { isValid: true, errors: [] };
  }

  metadata() {
    return {
      id: this.id,
      name: this.name,
      version: '1.0.0'
    };
  }
}
