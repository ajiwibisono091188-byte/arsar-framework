import { AICacheInterface } from '../interfaces/ai-cache-interface.js';

/**
 * AICache Class
 */
export class AICache extends AICacheInterface {
  /**
   * @param {Object} memoryCacheInstance Optional MemoryCache from Runtime Kernel container
   */
  constructor(memoryCacheInstance = null) {
    super();
    this.memoryCache = memoryCacheInstance;
    this.localStore = new Map();
  }

  get(key) {
    if (this.memoryCache) {
      return this.memoryCache.get(`ai:${key}`);
    }
    return this.localStore.get(key) || null;
  }

  set(key, value) {
    if (this.memoryCache) {
      this.memoryCache.set(`ai:${key}`, value);
    } else {
      this.localStore.set(key, value);
    }
  }

  clear() {
    if (this.memoryCache) {
      this.memoryCache.clear();
    } else {
      this.localStore.clear();
    }
  }
}
