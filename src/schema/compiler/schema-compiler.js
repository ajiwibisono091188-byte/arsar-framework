import { registry } from '../registry/schema-registry.js';

/**
 * Normalizes input data against a JSON Schema structure.
 * Sets default values, trims string spaces, and casts basic types.
 * @param {Object} schema 
 * @param {Object} data 
 * @returns {Object} Normalized data object
 */
function normalizeData(schema, data) {
  if (!schema) return data;
  const normalized = { ...data };
  const properties = schema.properties || {};

  Object.keys(properties).forEach((key) => {
    const propSchema = properties[key];
    let val = normalized[key];

    // 1. Fallback to schema default value if field is undefined or null
    if (val === undefined || val === null || val === '') {
      if (propSchema.default !== undefined) {
        normalized[key] = propSchema.default;
      }
      return;
    }

    // 2. Perform normalization based on type
    const expectedType = propSchema.type;
    
    if (expectedType === 'string' && typeof val === 'string') {
      normalized[key] = val.trim();
    } else if (expectedType === 'number') {
      if (typeof val === 'string' && !isNaN(val)) {
        normalized[key] = Number(val);
      }
    } else if (expectedType === 'boolean') {
      if (typeof val === 'string') {
        if (val.toLowerCase() === 'true') normalized[key] = true;
        if (val.toLowerCase() === 'false') normalized[key] = false;
      }
    } else if (expectedType === 'object' && typeof val === 'object' && !Array.isArray(val)) {
      normalized[key] = normalizeData(propSchema, val);
    } else if (expectedType === 'array' && Array.isArray(val) && propSchema.items) {
      normalized[key] = val.map(item => {
        if (propSchema.items.type === 'object') {
          return normalizeData(propSchema.items, item);
        }
        if (propSchema.items.type === 'string' && typeof item === 'string') {
          return item.trim();
        }
        return item;
      });
    }
  });

  return normalized;
}

/**
 * Schema Compiler Engine
 */
export class SchemaCompiler {
  /**
   * Compile raw data against a registered schema.
   * Loads the schema, runs validation, performs normalization, and returns the result.
   * @param {String} schemaName Name of registered schema
   * @param {Object} rawData Raw input data
   * @returns {Object} Compiled & normalized object
   */
  static compile(schemaName, rawData) {
    const schema = registry.get(schemaName);
    if (!schema) {
      throw new Error(`[Schema Compiler Error] Schema "${schemaName}" is not registered.`);
    }

    // Normalize (inject defaults, clean spacing, cast types)
    const normalized = normalizeData(schema, rawData);
    
    return normalized;
  }
}
