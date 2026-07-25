import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const appSchemasDir = path.resolve(__dirname, '../app');

/**
 * Schema Registry Singleton
 */
class SchemaRegistry {
  constructor() {
    this.schemas = new Map();
    this.init();
  }

  /**
   * Scan src/schema/app/ and register all schemas
   */
  init() {
    if (fs.existsSync(appSchemasDir)) {
      const files = fs.readdirSync(appSchemasDir);
      files.forEach((file) => {
        if (file.endsWith('.schema.json')) {
          const name = file.replace('.schema.json', '');
          const schemaPath = path.join(appSchemasDir, file);
          try {
            const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
            this.register(name, schema);
          } catch (error) {
            console.error(`[Schema Registry Error] Failed to load schema "${name}":`, error.message);
          }
        }
      });
      console.log(`[Schema Registry] Loaded ${this.schemas.size} application schemas.`);
    }
  }

  /**
   * Register a new schema
   * @param {String} name 
   * @param {Object} schema 
   */
  register(name, schema) {
    if (!name || !schema) {
      throw new Error('[Schema Registry] Cannot register empty name or schema.');
    }
    this.schemas.set(name.toLowerCase(), schema);
  }

  /**
   * Unregister an existing schema
   * @param {String} name 
   */
  unregister(name) {
    if (name) {
      this.schemas.delete(name.toLowerCase());
    }
  }

  /**
   * Get a schema by name
   * @param {String} name 
   * @returns {Object|null}
   */
  get(name) {
    if (!name) return null;
    return this.schemas.get(name.toLowerCase()) || null;
  }

  /**
   * List all registered schema names
   * @returns {Array<String>}
   */
  list() {
    return Array.from(this.schemas.keys());
  }

  /**
   * Check if a schema exists
   * @param {String} name 
   * @returns {Boolean}
   */
  exists(name) {
    if (!name) return false;
    return this.schemas.has(name.toLowerCase());
  }
}

export const registry = new SchemaRegistry();
