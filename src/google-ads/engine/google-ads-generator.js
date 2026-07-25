import { HeadlineGenerator } from '../headlines/headline-generator.js';
import { DescriptionGenerator } from '../descriptions/description-generator.js';
import { KeywordPlanner } from '../keywords/keyword-planner.js';
import { ExtensionsGenerator } from '../extensions/extensions-generator.js';
import { AdsValidator } from '../validator/ads-validator.js';
import { Exporter } from '../export/exporter.js';

/**
 * GoogleAdsGenerator Class
 */
export class GoogleAdsGenerator {
  /**
   * Orchestrate full Google Ads Search Campaign asset generation
   * @param {Object} input { company, offer, usp, audience, location, goal }
   * @returns {Object} Compiled campaign payload
   */
  static generate(input = {}) {
    const campaign = this.generateCampaign(input);
    const headlines = this.generateHeadlines(input);
    const descriptions = this.generateDescriptions(input);
    const keywords = this.generateKeywords(input);
    const extensions = this.generateExtensions(input);

    const payload = {
      campaignName: campaign.campaignName,
      adGroups: campaign.adGroups,
      headlines,
      descriptions,
      keywords: keywords.localIntent.concat(keywords.commercialIntent),
      negativeKeywords: keywords.negativeKeywords,
      sitelinks: extensions.sitelinks,
      callouts: extensions.callouts,
      structuredSnippets: extensions.structuredSnippets
    };

    // Validate character limits and duplicates
    const validation = AdsValidator.validate(payload);
    if (!validation.isValid) {
      throw new Error(`[Google Ads Generator Error] Built assets did not pass validation: ${validation.errors.join(', ')}`);
    }

    return payload;
  }

  static generateCampaign(input = {}) {
    const company = input.company || 'ARSAR';
    const offer = input.offer || 'Gadai BPKB';
    const location = input.location || 'Surabaya';
    return {
      campaignName: `SEM_Search_ID_${company}_${offer}_${location}`,
      adGroups: [
        { name: `AdGroup_${offer}_Brand`, type: "brand" },
        { name: `AdGroup_${offer}_Local`, type: "local" }
      ]
    };
  }

  static generateHeadlines(input = {}) {
    return HeadlineGenerator.generate(input);
  }

  static generateDescriptions(input = {}) {
    return DescriptionGenerator.generate(input);
  }

  static generateKeywords(input = {}) {
    return KeywordPlanner.plan(input);
  }

  static generateExtensions(input = {}) {
    return ExtensionsGenerator.generate(input);
  }

  static export(campaignData, format = 'json') {
    return Exporter.export(campaignData, format);
  }
}
