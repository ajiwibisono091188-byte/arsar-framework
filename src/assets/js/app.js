/**
 * ARSAR AI Marketing OS v2.0 - Main Application Entrypoint
 */

import Alpine from 'alpinejs';
import { initTheme, toggleTheme } from './theme.js';
import { initNavigation, setupMobileMenu } from './navigation.js';
import { setupFaq } from './faq.js';
import { loadTracking, trackEvent } from './tracking.js';
import { initScrollAnimations, initGlowCards } from './animation.js';
import { setupCalculator } from './calculator.js';
import { buildMarketingMessage, getWhatsAppUrl } from './whatsapp.js';

// Bind Alpine to window
window.Alpine = Alpine;

// Register Alpine Reactive Components
Alpine.data('mobileMenu', setupMobileMenu);
Alpine.data('faqAccordion', setupFaq);
Alpine.data('loanCalculator', setupCalculator);

// Start Alpine.js
Alpine.start();

// Initialize Core Application Features
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavigation();
  initScrollAnimations();
  initGlowCards();

  // Load tracking dynamically if present
  if (window.ARSAR_TRACKING_CONFIG) {
    loadTracking(window.ARSAR_TRACKING_CONFIG);
  }
});

// Export functions for inline access if needed
export {
  toggleTheme,
  trackEvent,
  buildMarketingMessage,
  getWhatsAppUrl
};
