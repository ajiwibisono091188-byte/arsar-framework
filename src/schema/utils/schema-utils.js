import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { SchemaValidator } from '../validators/schema-validator.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const schemasDir = path.resolve(__dirname, '../schemas');
const examplesDir = path.resolve(__dirname, '../examples');

/**
 * Load schema JSON by name
 * @param {String} name (e.g. "site")
 * @returns {Object} Schema JSON object
 */
export function loadSchema(name) {
  const schemaPath = path.join(schemasDir, `${name}.schema.json`);
  if (!fs.existsSync(schemaPath)) {
    throw new Error(`[Schema Loader Error] Schema "${name}" not found at ${schemaPath}`);
  }
  try {
    return JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
  } catch (error) {
    throw new Error(`[Schema Loader Error] Failed to parse schema "${name}": ${error.message}`);
  }
}

/**
 * Load example JSON by name
 * @param {String} name (e.g. "site")
 * @returns {Object} Example JSON object
 */
export function loadExample(name) {
  const examplePath = path.join(examplesDir, `${name}.example.json`);
  if (!fs.existsSync(examplePath)) {
    throw new Error(`[Example Loader Error] Example "${name}" not found at ${examplePath}`);
  }
  try {
    return JSON.parse(fs.readFileSync(examplePath, 'utf8'));
  } catch (error) {
    throw new Error(`[Example Loader Error] Failed to parse example "${name}": ${error.message}`);
  }
}

/**
 * Validate data against a named schema
 * @param {String} schemaName (e.g. "site")
 * @param {Object} data Data to validate
 * @returns {Object} Result from SchemaValidator.validate
 */
export function validateSchema(schemaName, data) {
  const schema = loadSchema(schemaName);
  return SchemaValidator.validate(schema, data, schemaName);
}

/**
 * Compare schema versions to check compatibility.
 * Returns true if schemaA is compatible with schemaB.
 * @param {Object} schemaA 
 * @param {Object} schemaB 
 * @returns {Boolean}
 */
export function compareSchemaVersion(schemaA, schemaB) {
  if (!schemaA.schemaVersion || !schemaB.schemaVersion) return false;
  
  const [majorA, minorA] = schemaA.schemaVersion.split('.').map(Number);
  const [majorB, minorB] = schemaB.schemaVersion.split('.').map(Number);
  
  // Compatible if Major version matches and local version is >= remote version
  if (majorA !== majorB) return false;
  return minorA >= minorB;
}
