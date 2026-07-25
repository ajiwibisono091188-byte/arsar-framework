import { AIValidatorInterface } from '../interfaces/ai-validator-interface.js';

/**
 * AIResponseValidator Class
 */
export class AIResponseValidator extends AIValidatorInterface {
  /**
   * Validate AI output text based on expectations
   * @param {String} response Raw LLM response string
   * @param {Object} expectations Rules dictionary (e.g. requiredFields, json, minLength)
   * @returns {Object} { isValid: boolean, errors: Array }
   */
  validate(response, expectations = {}) {
    const errors = [];

    if (typeof response !== 'string' || response.trim() === '') {
      errors.push('Response is empty or not a string.');
      return { isValid: false, errors };
    }

    // 1. Min length check
    if (expectations.minLength && response.length < expectations.minLength) {
      errors.push(`Response length (${response.length}) is below required minimum (${expectations.minLength}).`);
    }

    // 2. JSON check
    if (expectations.json) {
      try {
        const parsed = JSON.parse(response);

        // Required fields check inside JSON
        if (expectations.requiredFields && Array.isArray(expectations.requiredFields)) {
          expectations.requiredFields.forEach((field) => {
            if (!(field in parsed) || parsed[field] === undefined || parsed[field] === null) {
              errors.push(`Required field "${field}" is missing in JSON payload.`);
            }
          });
        }
      } catch (err) {
        errors.push(`Response is not a valid JSON structure: ${err.message}`);
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}
export const responseValidator = new AIResponseValidator();
