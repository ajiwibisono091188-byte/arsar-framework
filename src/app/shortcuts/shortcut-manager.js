/**
 * ShortcutManager Class
 */
export class ShortcutManager {
  constructor() {
    this.bindings = new Map();
    this.initGlobalListener();
  }

  /**
   * Bind hotkey to callback
   * @param {String} shortcut E.g. "Ctrl+K", "Ctrl+S"
   * @param {Function} callback 
   */
  bind(shortcut, callback) {
    if (typeof callback !== 'function') {
      throw new Error('[Shortcut Manager] Callback must be a function.');
    }
    this.bindings.set(shortcut.toLowerCase(), callback);
  }

  /**
   * Unbind hotkey
   */
  unbind(shortcut) {
    this.bindings.delete(shortcut.toLowerCase());
  }

  /**
   * Trigger keydown listener in browser
   */
  initGlobalListener() {
    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', (e) => {
        let keys = [];
        if (e.ctrlKey || e.metaKey) keys.push('ctrl');
        if (e.shiftKey) keys.push('shift');
        if (e.altKey) keys.push('alt');
        keys.push(e.key.toLowerCase());

        const combo = keys.join('+');
        const callback = this.bindings.get(combo);
        if (callback) {
          e.preventDefault();
          callback();
        }
      });
    }
  }

  /**
   * Manual trigger method for unit testing
   */
  trigger(combo) {
    const callback = this.bindings.get(combo.toLowerCase());
    if (callback) {
      callback();
      return true;
    }
    return false;
  }
}
export const shortcutManager = new ShortcutManager();
