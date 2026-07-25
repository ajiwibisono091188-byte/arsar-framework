import { loadConfig } from '../loaders/config-loader.js';

/**
 * Accessor helper to get Company Configuration.
 * @returns {Object}
 */
export function getCompany() {
  return loadConfig().company || {};
}

/**
 * Accessor helper to get Theme Configuration.
 * @returns {Object}
 */
export function getTheme() {
  return loadConfig().theme || {};
}

/**
 * Accessor helper to get SEO Configuration.
 * @returns {Object}
 */
export function getSEO() {
  return loadConfig().seo || {};
}

/**
 * Accessor helper to get Tracking Configuration.
 * @returns {Object}
 */
export function getTracking() {
  return loadConfig().tracking || {};
}

/**
 * Accessor helper to get Navigation Configuration.
 * @returns {Object}
 */
export function getNavigation() {
  return loadConfig().navigation || {};
}

/**
 * Accessor helper to get Landing Page Block Settings.
 * @returns {Object}
 */
export function getLanding() {
  return loadConfig().landing || {};
}

/**
 * Accessor helper to get Advertising & UTM Campaign Settings.
 * @returns {Object}
 */
export function getAds() {
  return loadConfig().ads || {};
}

/**
 * Accessor helper to get Form Handling Endpoints.
 * @returns {Object}
 */
export function getForm() {
  return loadConfig().forms || {};
}
