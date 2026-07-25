import nunjucks from 'nunjucks';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getTheme, generateCssTokens } from '../design/theme-loader.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const srcDir = path.resolve(__dirname, '..');
const playgroundDir = path.join(srcDir, 'playground');

// Ensure directory exists
if (!fs.existsSync(playgroundDir)) {
  fs.mkdirSync(playgroundDir, { recursive: true });
}

// 1. Generate design tokens CSS stylesheet first
generateCssTokens();

// 2. Load merged theme tokens & company data
const theme = getTheme();
const company = JSON.parse(fs.readFileSync(path.join(srcDir, 'config/company.json'), 'utf8'));

// 3. Configure Nunjucks environment
const env = new nunjucks.Environment(new nunjucks.FileSystemLoader(srcDir), {
  autoescape: true,
  noCache: true
});

const context = {
  theme,
  company,
  servicesSample: ["AI Marketing Automation", "Ultra-fast CDN Deployment", "Local SEO Multi-city System"],
  featuresSample: ["Lighthouse Performance >=98", "No Database Overheads", "Automatic JSON-LD Schema"]
};

// 4. Render playground template
try {
  const rendered = env.render('playground/playground.njk', context);
  fs.writeFileSync(path.join(playgroundDir, 'index.html'), rendered, 'utf8');
  console.log('[Playground Generator] Compiled: playground/index.html');
} catch (error) {
  console.error('[Playground Generator] Compilation error:', error);
}
