import { CacheInterface } from '../interfaces/cache-interface.js';

/**
 * MemoryCache Implementation
 */
export class MemoryCache extends CacheInterface {
  constructor() {
    super();
    this.store = new Map();
  }

  /**
   * Set key value with optional TTL
   * @param {String} key 
   * @param {Any} value 
   * @param {Number} ttlMs Time to live in milliseconds
   */
  set(key, value, ttlMs = 0) {
    const expiresAt = ttlMs > 0 ? Date.now() + ttlMs : 0;
    this.store.set(key, { value, expiresAt });
  }

  /**
   * Get cached value if not expired
   * @param {String} key 
   * @returns {Any|null}
   */
  get(key) {
    const item = this.store.get(key);
    if (!item) return null;

    // Check expiry
    if (item.expiresAt > 0 && Date.now() > item.expiresAt) {
      this.delete(key);
      return null;
    }
    return item.value;
  }

  /**
   * Check if cache has non-expired key
   * @param {String} key 
   * @returns {Boolean}
   */
  has(key) {
    const item = this.store.get(key);
    if (!item) return false;

    if (item.expiresAt > 0 && Date.now() > item.expiresAt) {
      this.delete(key);
      return false;
    }
    return true;
  }

  /**
   * Delete key from cache
   * @param {String} key 
   */
  delete(key) {
    this.store.delete(key);
  }

  /**
   * Clear cache map
   */
  clear() {
    this.store.clear();
  }
}
