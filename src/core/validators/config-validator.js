/**
 * Configuration Validator for ARSAR AI Marketing OS v2.0
 */

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
 * Validate the merged configuration object.
 * Throws errors on critical failures, prints warnings on non-blocking issues.
 * @param {Object} config 
 */
export function validateConfig(config) {
  console.log('[Validator] Commencing configuration validations...');
  let hasWarnings = false;

  // 1. Validate Site config
  if (!config.site) {
    throw new Error('[Validator Error] site.json configuration section is completely missing.');
  }
  if (!config.site.url) {
    throw new Error('[Validator Error] site.url is required for static asset references.');
  } else if (!isValidUrl(config.site.url)) {
    throw new Error(`[Validator Error] site.url "${config.site.url}" is not a valid URL.`);
  }

  // 2. Validate Company config
  if (!config.company) {
    throw new Error('[Validator Error] company.json configuration section is completely missing.');
  }
  if (!config.company.name) {
    throw new Error('[Validator Error] company.name is required for schema generation.');
  }
  if (config.company.email && !isValidEmail(config.company.email)) {
    throw new Error(`[Validator Error] company.email "${config.company.email}" is formatted incorrectly.`);
  }
  if (!config.company.phone) {
    console.warn('[Validator Warning] company.phone is missing. Users won\'t see phone contacts.');
    hasWarnings = true;
  }

  // 3. Validate Tracking config
  if (config.tracking) {
    if (config.tracking.googleAnalytics?.enabled && !config.tracking.googleAnalytics.measurementId) {
      console.warn('[Validator Warning] Google Analytics is enabled but measurementId is empty.');
      hasWarnings = true;
    }
    if (config.tracking.facebookPixel?.enabled && !config.tracking.facebookPixel.pixelId) {
      console.warn('[Validator Warning] Facebook Pixel is enabled but pixelId is empty.');
      hasWarnings = true;
    }
  }

  // 4. Validate SEO config
  if (config.seo) {
    if (!config.seo.defaultTitle) {
      console.warn('[Validator Warning] seo.defaultTitle is empty. Fallback title will be used.');
      hasWarnings = true;
    }
    if (!config.seo.defaultDescription) {
      console.warn('[Validator Warning] seo.defaultDescription is empty. Meta tags might be blank.');
      hasWarnings = true;
    }
  }

  // 5. Validate Contact config
  if (config.contact) {
    if (config.contact.supportEmail && !isValidEmail(config.contact.supportEmail)) {
      throw new Error(`[Validator Error] contact.supportEmail "${config.contact.supportEmail}" has an invalid email format.`);
    }
  }

  // 6. Validate CRM config
  if (config.crm) {
    if (config.crm.integrationEnabled && !config.crm.webhookUrl) {
      throw new Error('[Validator Error] CRM integration is enabled but crm.webhookUrl is missing.');
    } else if (config.crm.integrationEnabled && !isValidUrl(config.crm.webhookUrl)) {
      throw new Error(`[Validator Error] CRM webhookUrl "${config.crm.webhookUrl}" is not a valid URL.`);
    }
  }

  if (hasWarnings) {
    console.log('[Validator] Configuration validated with warning flags. Proceeding build...');
  } else {
    console.log('[Validator] Configuration validated successfully. No issues found.');
  }
}
