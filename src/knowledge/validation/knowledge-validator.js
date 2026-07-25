import { frameworks } from '../frameworks/framework-library.js';

/**
 * KnowledgeValidator Class
 */
export class KnowledgeValidator {
  /**
   * Validate industry dataset object
   * @param {Object} data Industry data JSON payload
   * @returns {Object} { isValid: boolean, errors: Array }
   */
  static validate(data) {
    const errors = [];

    if (!data || typeof data !== 'object') {
      errors.push('Industry data is empty or invalid.');
      return { isValid: false, errors };
    }

    // 1. Validate required fields
    const requiredFields = ['industry', 'painPoints', 'benefits', 'offers', 'objections', 'cta', 'keywords', 'faq'];
    requiredFields.forEach((field) => {
      if (!(field in data) || data[field] === undefined || data[field] === null) {
        errors.push(`Required root property "${field}" is missing.`);
      }
    });

    if (errors.length > 0) {
      return { isValid: false, errors };
    }

    // 2. Validate duplicate IDs inside lists
    const checkDuplicateIds = (list, name) => {
      if (!Array.isArray(list)) return;
      const ids = new Set();
      list.forEach((item, index) => {
        if (item && item.id) {
          if (ids.has(item.id)) {
            errors.push(`Duplicate ID "${item.id}" detected in list: "${name}" at index ${index}.`);
          }
          ids.add(item.id);
        }
      });
    };

    checkDuplicateIds(data.painPoints, 'painPoints');
    checkDuplicateIds(data.benefits, 'benefits');
    checkDuplicateIds(data.offers, 'offers');
    checkDuplicateIds(data.objections, 'objections');
    checkDuplicateIds(data.cta, 'cta');

    // 3. Cross-reference validation (check frameworkRecommendations exist in frameworks list)
    if (data.frameworkRecommendations && Array.isArray(data.frameworkRecommendations)) {
      data.frameworkRecommendations.forEach((fwKey) => {
        if (!(fwKey.toLowerCase() in frameworks)) {
          errors.push(`Invalid framework recommendation: "${fwKey}". Not registered in framework library.`);
        }
      });
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}
