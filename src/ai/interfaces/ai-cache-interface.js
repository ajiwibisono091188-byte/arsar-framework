/**
 * AI Cache Interface
 */
export class AICacheInterface {
  get(key) {
    throw new Error('Method "get()" must be implemented.');
  }

  set(key, value) {
    throw new Error('Method "set()" must be implemented.');
  }

  clear() {
    throw new Error('Method "clear()" must be implemented.');
  }
}
