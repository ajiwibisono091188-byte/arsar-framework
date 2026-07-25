/**
 * Step Interface
 */
export class StepInterface {
  execute(context) {
    throw new Error('Method "execute()" must be implemented.');
  }

  rollback(context) {
    throw new Error('Method "rollback()" must be implemented.');
  }

  validate(context) {
    throw new Error('Method "validate()" must be implemented.');
  }

  metadata() {
    throw new Error('Method "metadata()" must be implemented.');
  }
}
