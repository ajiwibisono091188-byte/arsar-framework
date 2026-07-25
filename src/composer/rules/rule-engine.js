/**
 * RuleEngine Class
 */
export class RuleEngine {
  constructor() {
    this.rules = [];
    this.initDefaultRules();
  }

  /**
   * Register a new marketing rule
   */
  registerRule(rule) {
    this.rules.push(rule);
  }

  /**
   * Evaluate context against rules
   * @param {Object} context { industry, goal, pageType }
   * @returns {Object} Merged recommendation payload
   */
  evaluate(context = {}) {
    let recommendation = {};

    this.rules.forEach((rule) => {
      try {
        if (rule.condition(context)) {
          console.log(`[Rule Engine] Applied rule: "${rule.name}"`);
          recommendation = {
            ...recommendation,
            ...rule.action(context)
          };
        }
      } catch (err) {
        console.error(`[Rule Engine Error] Failed to evaluate rule "${rule.name}":`, err.message);
      }
    });

    return recommendation;
  }

  initDefaultRules() {
    // Rule 1: Gadai BPKB / Automotive Financing Lead Generation Rule
    this.registerRule({
      name: "Gadai BPKB Lead Generation Rule",
      condition: (ctx) => 
        (ctx.industry === "Gadai BPKB" || ctx.industry === "Automotive Financing") && 
        ctx.goal === "Lead Generation",
      action: () => ({
        strategy: "conversion",
        layout: "split",
        sections: ["hero", "benefits", "testimonials", "cta", "faq", "footer"]
      })
    });

    // Rule 2: Wellness Spa Local Business Rule
    this.registerRule({
      name: "Wellness Spa Local Business Rule",
      condition: (ctx) => 
        ctx.industry === "Wellness Spa" && 
        ctx.pageType === "landing",
      action: () => ({
        strategy: "local-business",
        layout: "alternating",
        sections: ["hero", "benefits", "gallery", "testimonials", "cta", "footer"]
      })
    });
  }
}
export const ruleEngine = new RuleEngine();
