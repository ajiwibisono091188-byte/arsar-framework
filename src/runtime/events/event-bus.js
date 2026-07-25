/**
 * Light dependency-free EventBus Implementation
 */
export class EventBus {
  constructor() {
    this.events = new Map();
  }

  /**
   * Subscribe to event
   * @param {String} event 
   * @param {Function} callback 
   */
  on(event, callback) {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event).push(callback);
    return () => this.off(event, callback);
  }

  /**
   * Subscribe to event once
   * @param {String} event 
   * @param {Function} callback 
   */
  once(event, callback) {
    const onceWrapper = (...args) => {
      this.off(event, onceWrapper);
      callback(...args);
    };
    return this.on(event, onceWrapper);
  }

  /**
   * Unsubscribe from event
   * @param {String} event 
   * @param {Function} callback 
   */
  off(event, callback) {
    const list = this.events.get(event);
    if (!list) return;

    this.events.set(
      event,
      list.filter((cb) => cb !== callback)
    );
  }

  /**
   * Emit event triggering all callbacks
   * @param {String} event 
   * @param  {...any} args 
   */
  emit(event, ...args) {
    const list = this.events.get(event);
    if (!list) return;
    [...list].forEach((cb) => {
      try {
        cb(...args);
      } catch (err) {
        console.error(`[Event Bus Error] Failed to execute callback for event "${event}":`, err);
      }
    });
  }

  /**
   * Get all listeners for an event
   * @param {String} event 
   * @returns {Array<Function>}
   */
  listeners(event) {
    return this.events.get(event) || [];
  }
}
