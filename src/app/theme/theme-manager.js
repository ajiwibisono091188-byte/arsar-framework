/**
 * ThemeManager Class
 */
export class ThemeManager {
  constructor() {
    this.theme = 'system';
  }

  /**
   * Set active theme mode
   * @param {String} theme light, dark, or system
   */
  setTheme(theme) {
    if (theme !== 'light' && theme !== 'dark' && theme !== 'system') {
      throw new Error(`[Theme Manager] Invalid theme mode: "${theme}"`);
    }
    this.theme = theme;

    // Apply class to DOM in browser environment
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      root.classList.remove('light', 'dark');
      
      let resolvedTheme = theme;
      if (theme === 'system') {
        const matchesDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        resolvedTheme = matchesDark ? 'dark' : 'light';
      }
      
      root.classList.add(resolvedTheme);
    }
    console.log(`[Theme Manager] Theme set to: "${theme}"`);
  }

  getTheme() {
    return this.theme;
  }
}
