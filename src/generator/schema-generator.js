import fs from 'fs';
import path from 'path';
import nunjucks from 'nunjucks';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const srcDir = path.resolve(__dirname, '..');

// Load configurations
const readJson = (file) => JSON.parse(fs.readFileSync(path.join(srcDir, file), 'utf8'));
const company = readJson('config/company.json');

// Configure Nunjucks for schemas rendering
const env = new nunjucks.Environment(new nunjucks.FileSystemLoader(srcDir), {
  autoescape: false // Disable escaping since we want raw JSON outputs
});

/**
 * Generate Organization JSON-LD Schema
 * @returns {string}
 */
export function generateOrganizationSchema() {
  const templatePath = 'schema/Organization.json';
  try {
    const rawJsonString = env.render(templatePath, { company });
    // Parse and stringify to minify JSON
    return JSON.stringify(JSON.parse(rawJsonString));
  } catch (error) {
    console.error('[Schema Generator] Error rendering Organization schema:', error);
    return '';
  }
}

/**
 * Generate LocalBusiness Schema for a specific city
 * @param {Object} city 
 * @returns {string}
 */
export function generateLocalBusinessSchema(city) {
  const templatePath = 'schema/LocalBusiness.json';
  try {
    const rawJsonString = env.render(templatePath, { company, city });
    return JSON.stringify(JSON.parse(rawJsonString));
  } catch (error) {
    console.error(`[Schema Generator] Error rendering LocalBusiness schema for ${city?.name}:`, error);
    return '';
  }
}

/**
 * Generate FAQ Page Schema from faqs list
 * @param {Array} faqs 
 * @returns {string}
 */
export function generateFaqSchema(faqs) {
  const templatePath = 'schema/FAQ.json';
  try {
    const rawJsonString = env.render(templatePath, { faqs });
    return JSON.stringify(JSON.parse(rawJsonString));
  } catch (error) {
    console.error('[Schema Generator] Error rendering FAQ schema:', error);
    return '';
  }
}

// If executed directly, run sample outputs
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  console.log('[Schema Generator] Generating sample schemas...');
  const orgSchema = generateOrganizationSchema();
  console.log('Organization Schema:', orgSchema ? 'SUCCESS' : 'FAILED');
}
