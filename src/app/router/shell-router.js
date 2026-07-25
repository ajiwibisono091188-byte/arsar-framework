/**
 * ShellRouter Class
 */
export class ShellRouter {
  constructor() {
    this.routes = new Map();
    this.currentPath = '/';
  }

  /**
   * Register a new path endpoint
   */
  addRoute(path, target) {
    this.routes.set(path.toLowerCase(), target);
  }

  /**
   * Navigate to target endpoint
   */
  navigateTo(path) {
    const key = path.toLowerCase();
    if (!this.routes.has(key)) {
      throw new Error(`[Shell Router Error] Route "${path}" is not registered.`);
    }
    this.currentPath = key;
    console.log(`[Shell Router] Navigated to: "${this.currentPath}"`);
    return this.routes.get(key);
  }

  getCurrentRoute() {
    return this.currentPath;
  }
}
export const shellRouter = new ShellRouter();
