/**
 * ServiceContainer for Dependency Injection
 */
export class ServiceContainer {
  constructor() {
    this.bindings = new Map();
  }

  /**
   * Register a transient service factory
   * @param {String} name 
   * @param {Function} factory 
   */
  register(name, factory) {
    if (typeof factory !== 'function') {
      throw new Error(`[Service Container] Factory for "${name}" must be a function.`);
    }
    this.bindings.set(name.toLowerCase(), {
      factory,
      type: 'transient'
    });
  }

  /**
   * Register a singleton service instance or factory
   * @param {String} name 
   * @param {Any|Function} instanceOrFactory 
   */
  singleton(name, instanceOrFactory) {
    if (typeof instanceOrFactory === 'function') {
      this.bindings.set(name.toLowerCase(), {
        factory: instanceOrFactory,
        type: 'singleton',
        instance: null
      });
    } else {
      this.bindings.set(name.toLowerCase(), {
        instance: instanceOrFactory,
        type: 'singleton'
      });
    }
  }

  /**
   * Resolve a service by name
   * @param {String} name 
   * @returns {Any}
   */
  resolve(name) {
    const key = name.toLowerCase();
    const binding = this.bindings.get(key);

    if (!binding) {
      throw new Error(`[Service Container] Service "${name}" is not registered.`);
    }

    if (binding.type === 'singleton') {
      if (binding.instance === null && binding.factory) {
        // Instantiate using container context
        binding.instance = binding.factory(this);
      }
      return binding.instance;
    }

    // Transient resolution
    return binding.factory(this);
  }

  /**
   * Check if a service is registered
   * @param {String} name 
   * @returns {Boolean}
   */
  has(name) {
    return this.bindings.has(name.toLowerCase());
  }

  /**
   * Remove service registration
   * @param {String} name 
   */
  remove(name) {
    this.bindings.delete(name.toLowerCase());
  }
}
