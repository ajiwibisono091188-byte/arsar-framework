import nunjucks from 'nunjucks';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { loadConfig, clearConfigCache } from '../core/loaders/config-loader.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const srcDir = path.resolve(__dirname, '..');
const playgroundDir = path.join(srcDir, 'config-playground');

// Ensure directory exists
if (!fs.existsSync(playgroundDir)) {
  fs.mkdirSync(playgroundDir, { recursive: true });
}

// Configure Nunjucks environment
const env = new nunjucks.Environment(new nunjucks.FileSystemLoader(srcDir), {
  autoescape: true,
  noCache: true
});

export function buildConfigPlayground() {
  console.log('[Config Playground Generator] Resolving merged configs...');
  
  // Clear cache first to get fresh overrides if modified
  clearConfigCache();
  const config = loadConfig();
  
  // Add some metadata about load conditions
  const projectActive = process.env.VITE_ARSAR_PROJECT || process.env.ARSAR_PROJECT || 'DEFAULT (No override)';
  const envActive = process.env.VITE_APP_ENV || process.env.NODE_ENV || 'development';

  const context = {
    config,
    projectActive,
    envActive,
    loadTimestamp: new Date().toLocaleTimeString('id-ID')
  };

  try {
    const rendered = env.render('config-playground/playground.njk', context);
    fs.writeFileSync(path.join(playgroundDir, 'index.html'), rendered, 'utf8');
    console.log('[Config Playground Generator] Compiled: config-playground/index.html');
  } catch (error) {
    console.error('[Config Playground Generator] Compilation error:', error);
  }
}

// Auto-run when executed directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  buildConfigPlayground();
}
