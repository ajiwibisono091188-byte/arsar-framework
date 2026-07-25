import { registry } from '../registry/schema-registry.js';

// Helper to validate email format
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Helper to validate URL format
const isValidUrl = (urlStr) => {
  try {
    new URL(urlStr);
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * Generic Validator Class
 */
export class SchemaValidator {
  /**
   * Validate data against a JSON Schema
   * @param {Object} schema JSON Schema definition
   * @param {Object} data Data object to validate
   * @param {String} basePath Base path for path tracing (e.g. "site")
   * @returns {Object} { isValid: boolean, errors: Array, warnings: Array }
   */
  static validate(schema, data, basePath = '') {
    const errors = [];
    const warnings = [];

    if (!schema) {
      errors.push({ path: basePath, message: 'Schema definition is missing or invalid.' });
      return { isValid: false, errors, warnings };
    }

    if (data === undefined || data === null) {
      errors.push({ path: basePath, message: 'Data is missing or undefined.' });
      return { isValid: false, errors, warnings };
    }

    const properties = schema.properties || {};
    const requiredFields = schema.required || [];

    // Check required fields
    requiredFields.forEach((field) => {
      const fieldPath = basePath ? `${basePath}.${field}` : field;
      if (data[field] === undefined || data[field] === null || data[field] === '') {
        errors.push({
          path: fieldPath,
          message: `Required field "${field}" is missing or empty.`
        });
      }
    });

    // Check all properties present in data
    Object.keys(data).forEach((key) => {
      const value = data[key];
      const propSchema = properties[key];
      const fieldPath = basePath ? `${basePath}.${key}` : key;

      if (!propSchema) {
        warnings.push({
          path: fieldPath,
          message: `Property "${key}" is not defined in schema properties.`
        });
        return;
      }

      // Check type
      const expectedType = propSchema.type;
      const actualType = typeof value;

      if (expectedType === 'array') {
        if (!Array.isArray(value)) {
          errors.push({
            path: fieldPath,
            message: `Expected type "array", got "${actualType}".`
          });
        } else if (propSchema.items) {
          value.forEach((item, index) => {
            const itemPath = `${fieldPath}[${index}]`;
            if (propSchema.items.type && typeof item !== propSchema.items.type) {
              errors.push({
                path: itemPath,
                message: `Expected array item type "${propSchema.items.type}", got "${typeof item}".`
              });
            }
          });
        }
      } else if (expectedType === 'object') {
        if (actualType !== 'object' || Array.isArray(value)) {
          errors.push({
            path: fieldPath,
            message: `Expected type "object", got "${actualType}".`
          });
        } else {
          const nestedResult = SchemaValidator.validate(propSchema, value, fieldPath);
          errors.push(...nestedResult.errors);
          warnings.push(...nestedResult.warnings);
        }
      } else if (expectedType) {
        if (expectedType === 'number' && actualType !== 'number') {
          errors.push({
            path: fieldPath,
            message: `Expected type "number", got "${actualType}".`
          });
        } else if (expectedType === 'boolean' && actualType !== 'boolean') {
          errors.push({
            path: fieldPath,
            message: `Expected type "boolean", got "${actualType}".`
          });
        } else if (expectedType === 'string' && actualType !== 'string') {
          errors.push({
            path: fieldPath,
            message: `Expected type "string", got "${actualType}".`
          });
        }

        // Validate formats
        if (actualType === 'string' && propSchema.format) {
          if (propSchema.format === 'url' && !isValidUrl(value)) {
            errors.push({
              path: fieldPath,
              message: `Format error: "${value}" is not a valid URL.`
            });
          } else if (propSchema.format === 'email' && !isValidEmail(value)) {
            errors.push({
              path: fieldPath,
              message: `Format error: "${value}" is not a valid email address.`
            });
          }
        }

        // Validate custom regex patterns
        if (actualType === 'string' && propSchema.pattern) {
          const regex = new RegExp(propSchema.pattern);
          if (!regex.test(value)) {
            errors.push({
              path: fieldPath,
              message: `Pattern mismatch: "${value}" does not match pattern "${propSchema.pattern}".`
            });
          }
        }
      }
    });

    // Check for optional missing fields
    Object.keys(properties).forEach((key) => {
      const fieldPath = basePath ? `${basePath}.${key}` : key;
      if (data[key] === undefined || data[key] === null) {
        if (!requiredFields.includes(key)) {
          warnings.push({
            path: fieldPath,
            message: `Optional field "${key}" is empty or not defined. Using system fallback.`
          });
        }
      }
    });

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }
}

/**
 * Validate data against a registered application schema by name
 * @param {String} schemaName Name of the schema in Registry
 * @param {Object} data Data payload to validate
 * @returns {Object} Validation result
 */
export function validateAppSchema(schemaName, data) {
  const schema = registry.get(schemaName);
  if (!schema) {
    return {
      isValid: false,
      errors: [{ path: schemaName, message: `Schema "${schemaName}" is not registered in Registry.` }],
      warnings: []
    };
  }
  return SchemaValidator.validate(schema, data, schemaName);
}
