import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { validateConfig } from '../validators/config-validator.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const configDir = path.resolve(__dirname, '../config');

// In-memory cache for configuration instance
let cachedConfig = null;

// Clean deep merge utility helper
function deepMerge(target, source) {
  if (!source) return target;
  if (!target) return source;

  const output = { ...target };
  
  for (const key of Object.keys(source)) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      if (key in target) {
        output[key] = deepMerge(target[key], source[key]);
      } else {
        output[key] = source[key];
      }
    } else {
      output[key] = source[key];
    }
  }
  return output;
}

/**
 * Load, merge, validate and cache the complete configuration.
 * @returns {Object} Combined configuration object
 */
export function loadConfig() {
  // Return cached config if already resolved
  if (cachedConfig) {
    return cachedConfig;
  }

  console.log('[Config Loader] Loading configuration system...');
  
  const scopes = [
    'site', 'company', 'theme', 'navigation', 'tracking',
    'seo', 'ads', 'blog', 'landing', 'forms',
    'crm', 'deployment', 'social', 'contact'
  ];

  let config = {};

  // 1. Load Defaults
  scopes.forEach((scope) => {
    const defaultPath = path.join(configDir, `${scope}.json`);
    if (fs.existsSync(defaultPath)) {
      try {
        config[scope] = JSON.parse(fs.readFileSync(defaultPath, 'utf8'));
      } catch (err) {
        console.error(`[Config Loader Error] Failed to parse default ${scope}.json:`, err);
      }
    } else {
      config[scope] = {};
    }
  });

  // 2. Load Project Overrides (e.g. from src/core/config/projects/[project]/)
  // Check env variable (supports Vite process.env or standard process.env)
  const project = process.env.VITE_ARSAR_PROJECT || process.env.ARSAR_PROJECT || '';
  if (project) {
    console.log(`[Config Loader] Project override detected: "${project}". Merging project values...`);
    const projectDir = path.join(configDir, 'projects', project.toLowerCase());
    
    scopes.forEach((scope) => {
      const projectPath = path.join(projectDir, `${scope}.json`);
      if (fs.existsSync(projectPath)) {
        try {
          const overrideData = JSON.parse(fs.readFileSync(projectPath, 'utf8'));
          config[scope] = deepMerge(config[scope], overrideData);
          console.log(`[Config Loader] Merged project override for: ${scope}.json`);
        } catch (err) {
          console.error(`[Config Loader Error] Failed to parse project override for ${scope}:`, err);
        }
      }
    });
  }

  // 3. Load Environment Overrides (e.g. Development / Production / Preview)
  // Check env (standard or Vite)
  const env = process.env.VITE_APP_ENV || process.env.NODE_ENV || 'development';
  console.log(`[Config Loader] Current environment: "${env}". Merging environment settings...`);
  
  if (env === 'production') {
    // For production, force enable tracking if configurations exist, etc.
    if (config.tracking) {
      config.tracking.googleAnalytics = config.tracking.googleAnalytics || {};
      config.tracking.facebookPixel = config.tracking.facebookPixel || {};
      // Example production overrides
      config.tracking.googleAnalytics.enabled = true;
      config.tracking.facebookPixel.enabled = true;
    }
  }

  // 4. Validate the merged configuration
  validateConfig(config);

  // 5. Cache the config
  cachedConfig = config;
  return cachedConfig;
}

/**
 * Clear cache (useful for hot-reloads during development tests)
 */
export function clearConfigCache() {
  cachedConfig = null;
}
