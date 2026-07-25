/**
 * FAQ Accordion State Manager
 */

export function setupFaq() {
  return {
    activeFaq: null,
    toggle(index) {
      this.activeFaq = this.activeFaq === index ? null : index;
    },
    isOpen(index) {
      return this.activeFaq === index;
    }
  };
}
