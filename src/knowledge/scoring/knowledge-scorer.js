/**
 * KnowledgeScorer Class
 * Calculates relevancy matching score between user project variables and industry knowledge data
 */
export class KnowledgeScorer {
  /**
   * Score match percentage
   * @param {Object} project { industry, audience, offer, location }
   * @param {Object} industryData Industry database object
   * @returns {Number} Score from 0 to 100
   */
  static calculateRelevance(project = {}, industryData = {}) {
    let score = 0;

    if (!project || !industryData) return 0;

    // 1. Industry match (Weight: 40 points)
    if (project.industry && industryData.industry) {
      if (project.industry.toLowerCase() === industryData.industry.toLowerCase()) {
        score += 40;
      } else if (industryData.industry.toLowerCase().includes(project.industry.toLowerCase()) ||
                 project.industry.toLowerCase().includes(industryData.industry.toLowerCase())) {
        score += 20; // Partial match
      }
    }

    // 2. Audience persona match (Weight: 30 points)
    if (project.audience && Array.isArray(industryData.audiences)) {
      const match = industryData.audiences.some((aud) =>
        aud.persona.toLowerCase().includes(project.audience.toLowerCase()) ||
        project.audience.toLowerCase().includes(aud.persona.toLowerCase())
      );
      if (match) {
        score += 30;
      }
    }

    // 3. Offer keyword overlap (Weight: 20 points)
    if (project.offer && Array.isArray(industryData.offers)) {
      const match = industryData.offers.some((off) =>
        off.title.toLowerCase().includes(project.offer.toLowerCase()) ||
        project.offer.toLowerCase().includes(off.title.toLowerCase())
      );
      if (match) {
        score += 20;
      }
    }

    // 4. Location match / Local SEO keywords (Weight: 10 points)
    if (project.location && Array.isArray(industryData.keywords)) {
      const match = industryData.keywords.some((kw) =>
        kw.toLowerCase().includes(project.location.toLowerCase())
      );
      if (match) {
        score += 10;
      }
    }

    return score;
  }
}
