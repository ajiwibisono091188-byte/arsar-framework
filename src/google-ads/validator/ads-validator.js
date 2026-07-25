/**
 * AdsValidator Class
 */
export class AdsValidator {
  /**
   * Validate campaign assets
   * @param {Object} data Compiled campaign object
   * @returns {Object} { isValid: boolean, errors: Array }
   */
  static validate(data = {}) {
    const errors = [];

    // 1. Verify Headlines
    const headlines = data.headlines || [];
    const uniqueHeadlines = new Set();

    headlines.forEach((hl, index) => {
      if (hl.length > 30) {
        errors.push(`Headline "${hl}" exceeds maximum length of 30 characters (${hl.length} chars).`);
      }
      if (uniqueHeadlines.has(hl)) {
        errors.push(`Duplicate headline detected: "${hl}" at index ${index}.`);
      }
      uniqueHeadlines.add(hl);
    });

    // 2. Verify Descriptions
    const descriptions = data.descriptions || [];
    const uniqueDescriptions = new Set();

    descriptions.forEach((desc, index) => {
      if (desc.length > 90) {
        errors.push(`Description "${desc}" exceeds maximum length of 90 characters (${desc.length} chars).`);
      }
      if (uniqueDescriptions.has(desc)) {
        errors.push(`Duplicate description detected: "${desc}" at index ${index}.`);
      }
      uniqueDescriptions.add(desc);
    });

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}
