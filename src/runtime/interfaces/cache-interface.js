/**
 * Cache Interface Definition
 */
export class CacheInterface {
  set(key, value, ttlMs) {
    throw new Error('Method "set()" must be implemented.');
  }

  get(key) {
    throw new Error('Method "get()" must be implemented.');
  }

  has(key) {
    throw new Error('Method "has()" must be implemented.');
  }

  delete(key) {
    throw new Error('Method "delete()" must be implemented.');
  }

  clear() {
    throw new Error('Method "clear()" must be implemented.');
  }
}
