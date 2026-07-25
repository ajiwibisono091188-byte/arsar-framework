import { sections as librarySections } from '../sections/section-library.js';

/**
 * BlueprintValidator Class
 */
export class BlueprintValidator {
  /**
   * Validate page blueprint structure and sorting order
   * @param {Object} blueprint Page blueprint JSON payload
   * @returns {Object} { isValid: boolean, errors: Array }
   */
  static validate(blueprint) {
    const errors = [];

    if (!blueprint || typeof blueprint !== 'object') {
      errors.push('Blueprint is empty or invalid.');
      return { isValid: false, errors };
    }

    // 1. Check required root fields
    const requiredFields = ['pageType', 'goal', 'strategy', 'layout', 'sections', 'metadata', 'dependencies'];
    requiredFields.forEach((field) => {
      if (!(field in blueprint) || blueprint[field] === undefined || blueprint[field] === null) {
        errors.push(`Required blueprint property "${field}" is missing.`);
      }
    });

    if (errors.length > 0) {
      return { isValid: false, errors };
    }

    // 2. Validate sections list
    const sections = blueprint.sections;
    if (!Array.isArray(sections)) {
      errors.push('Property "sections" must be an Array.');
      return { isValid: false, errors };
    }

    const uniqueSections = new Set();
    const sectionOrderDetails = [];

    sections.forEach((secId, index) => {
      // Check duplicate section
      if (uniqueSections.has(secId)) {
        errors.push(`Duplicate section id detected in blueprint: "${secId}" at index ${index}.`);
      }
      uniqueSections.add(secId);

      // Check section exists in library
      const libData = librarySections[secId];
      if (!libData) {
        errors.push(`Section "${secId}" at index ${index} does not exist in Section Library.`);
      } else {
        sectionOrderDetails.push({
          id: secId,
          index,
          recommendedOrder: libData.recommendedOrder
        });
      }
    });

    // 3. Verify section sorting order (hero order 10 must come before footer order 200)
    for (let i = 0; i < sectionOrderDetails.length - 1; i++) {
      const current = sectionOrderDetails[i];
      const next = sectionOrderDetails[i + 1];
      if (current.recommendedOrder > next.recommendedOrder) {
        errors.push(`Invalid section ordering: "${current.id}" (priority ${current.recommendedOrder}) is placed before "${next.id}" (priority ${next.recommendedOrder}).`);
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}
