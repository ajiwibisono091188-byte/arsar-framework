import { layoutRegistry } from '../layouts/layout-registry.js';
import { strategyRegistry } from '../strategies/strategy-registry.js';
import { ruleEngine } from '../rules/rule-engine.js';
import { BlueprintValidator } from '../validation/blueprint-validator.js';

/**
 * ExperienceComposer Class
 */
export class ExperienceComposer {
  /**
   * @param {Object} eventBus Optional EventBus for hooks
   */
  constructor(eventBus = null) {
    this.eventBus = eventBus;
  }

  /**
   * Helper to emit event signals
   */
  emit(event, ...args) {
    if (this.eventBus) {
      this.eventBus.emit(event, ...args);
    } else {
      console.log(`[Experience Composer Event] ${event}:`, ...args);
    }
  }

  /**
   * Compose a complete page blueprint based on project profiles and industry data
   * @param {Object} projectConfig 
   * @param {Object} industryData 
   * @returns {Object} Validated page blueprint
   */
  compose(projectConfig = {}, industryData = {}) {
    this.emit('composer.started');

    // 1. Evaluate rules based on context variables
    const context = {
      industry: industryData.industry || projectConfig.industry || '',
      goal: projectConfig.goal || 'Lead Generation',
      pageType: projectConfig.pageType || 'landing'
    };

    const recommendation = ruleEngine.evaluate(context);

    // 2. Fallbacks if no rule matched
    const strategy = recommendation.strategy || this.selectStrategy(projectConfig, industryData);
    const layout = recommendation.layout || this.selectLayout(strategy);
    const sections = recommendation.sections || ["hero", "benefits", "testimonials", "cta", "footer"];

    this.emit('composer.strategy.selected', strategy);

    // 3. Assemble Page Blueprint structure
    const blueprint = {
      pageType: context.pageType,
      goal: context.goal,
      strategy,
      layout,
      sections,
      metadata: {
        title: projectConfig.title || industryData.industry || 'ARSAR Compiled Page',
        timestamp: new Date().toISOString()
      },
      dependencies: ["tailwind-v4", "nunjucks-macros"]
    };

    this.emit('composer.blueprint.created', blueprint);

    // 4. Validate Blueprint integrity
    const validation = this.validateBlueprint(blueprint);
    if (!validation.isValid) {
      throw new Error(`[Composer Error] Created blueprint is invalid: ${validation.errors.join(', ')}`);
    }

    return blueprint;
  }

  /**
   * Generate raw page blueprint
   */
  composePage(pageType, goal, options = {}) {
    const blueprint = {
      pageType,
      goal,
      strategy: options.strategy || "lead-generation",
      layout: options.layout || "single-column",
      sections: options.sections || ["hero", "footer"],
      metadata: options.metadata || { title: "Draft Page" },
      dependencies: options.dependencies || []
    };
    return blueprint;
  }

  /**
   * Evaluate strategy selection heuristics
   */
  selectStrategy(projectConfig, industryData) {
    if (projectConfig.goal === 'Ecommerce' || (industryData && industryData.seoIntent === 'transactional')) {
      return 'ecommerce';
    }
    if (projectConfig.goal === 'Brand Awareness') {
      return 'brand-awareness';
    }
    return 'lead-generation'; // Standard fallback
  }

  /**
   * Select most compatible layout based on strategy
   */
  selectLayout(strategy) {
    if (strategy === 'conversion') return 'split';
    if (strategy === 'ecommerce') return 'card-grid';
    return 'single-column';
  }

  /**
   * Verify blueprint integrity
   */
  validateBlueprint(blueprint) {
    const result = BlueprintValidator.validate(blueprint);
    this.emit('composer.validation.completed', result.isValid);
    return result;
  }
}
