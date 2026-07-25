import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { frameworks } from '../frameworks/framework-library.js';
import { KnowledgeValidator } from '../validation/knowledge-validator.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

/**
 * KnowledgeSearch Helper Class
 */
export class KnowledgeSearch {
  /**
   * Search query across loaded industries
   * @param {Map} industries 
   * @param {Object} options { industry, keyword, painpoint, offer, framework }
   * @returns {Array} List of matched industry objects
   */
  static query(industries, options = {}) {
    const results = [];
    for (const [key, data] of industries.entries()) {
      let isMatch = false;

      // 1. Match industry name
      if (options.industry && data.industry.toLowerCase().includes(options.industry.toLowerCase())) {
        isMatch = true;
      }

      // 2. Match keyword list
      if (options.keyword && Array.isArray(data.keywords)) {
        if (data.keywords.some(kw => kw.toLowerCase().includes(options.keyword.toLowerCase()))) {
          isMatch = true;
        }
      }

      // 3. Match pain point description
      if (options.painpoint && Array.isArray(data.painPoints)) {
        if (data.painPoints.some(pp => pp.text.toLowerCase().includes(options.painpoint.toLowerCase()))) {
          isMatch = true;
        }
      }

      // 4. Match offer description
      if (options.offer && Array.isArray(data.offers)) {
        if (data.offers.some(off => off.title.toLowerCase().includes(options.offer.toLowerCase()))) {
          isMatch = true;
        }
      }

      // 5. Match recommended frameworks
      if (options.framework && Array.isArray(data.frameworkRecommendations)) {
        if (data.frameworkRecommendations.some(fw => fw.toLowerCase() === options.framework.toLowerCase())) {
          isMatch = true;
        }
      }

      if (isMatch) {
        results.push(data);
      }
    }
    return results;
  }
}

/**
 * KnowledgeEngine Class
 */
export class KnowledgeEngine {
  /**
   * @param {Object} eventBus Optional EventBus for triggers
   */
  constructor(eventBus = null) {
    this.industries = new Map();
    this.eventBus = eventBus;
    this.loadIndustry();
  }

  /**
   * Helper to emit event signals
   */
  emit(event, ...args) {
    if (this.eventBus) {
      this.eventBus.emit(event, ...args);
    } else {
      console.log(`[Knowledge Engine Event] ${event}:`, ...args);
    }
  }

  /**
   * Scan and load industry JSON configurations
   * @param {String} customPath Optional custom folder path to read from
   */
  loadIndustry(customPath = null) {
    this.industries.clear();
    const searchPath = customPath || path.join(__dirname, '../industry');

    try {
      if (fs.existsSync(searchPath)) {
        const files = fs.readdirSync(searchPath);
        files.forEach((file) => {
          if (file.endsWith('.json')) {
            const content = fs.readFileSync(path.join(searchPath, file), 'utf8');
            const data = JSON.parse(content);
            
            const validation = KnowledgeValidator.validate(data);
            if (validation.isValid) {
              this.industries.set(data.industry.toLowerCase(), data);
            } else {
              console.warn(`[Knowledge Engine Warning] Industry file "${file}" failed validation:`, validation.errors);
            }
          }
        });
      }
      this.emit('knowledge.loaded', this.industries.size);
    } catch (err) {
      console.warn(`[Knowledge Engine Warning] Failed to load industry JSON files: ${err.message}`);
    }
  }

  /**
   * Get single industry record
   */
  getIndustry(industryName) {
    const key = industryName.toLowerCase();
    return this.industries.get(key) || null;
  }

  getPainPoints(industryName) {
    const data = this.getIndustry(industryName);
    return data ? data.painPoints : [];
  }

  getBenefits(industryName) {
    const data = this.getIndustry(industryName);
    return data ? data.benefits : [];
  }

  getOffers(industryName) {
    const data = this.getIndustry(industryName);
    return data ? data.offers : [];
  }

  getObjections(industryName) {
    const data = this.getIndustry(industryName);
    return data ? data.objections : [];
  }

  getCTA(industryName) {
    const data = this.getIndustry(industryName);
    return data ? data.cta : [];
  }

  /**
   * Get copywriting framework metadata
   */
  getFramework(name) {
    const key = name.toLowerCase();
    return frameworks[key] || null;
  }

  /**
   * Query database
   */
  search(options = {}) {
    const results = KnowledgeSearch.query(this.industries, options);
    this.emit('knowledge.searched', options, results.length);
    return results;
  }
}
