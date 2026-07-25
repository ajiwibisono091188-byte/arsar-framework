/**
 * Exporter Class
 */
export class Exporter {
  /**
   * Export campaign data to format
   * @param {Object} campaignData 
   * @param {String} format json or csv
   * @returns {String} Compiled text output
   */
  static export(campaignData, format = 'json') {
    if (format === 'json') {
      return JSON.stringify(campaignData, null, 2);
    }
    
    if (format === 'csv') {
      // Simple CSV export for Headlines & Descriptions
      let csv = "Type,Content\n";
      (campaignData.headlines || []).forEach(hl => {
        csv += `Headline,"${hl.replace(/"/g, '""')}"\n`;
      });
      (campaignData.descriptions || []).forEach(desc => {
        csv += `Description,"${desc.replace(/"/g, '""')}"\n`;
      });
      return csv;
    }

    throw new Error(`[Exporter Error] Unsupported export format: "${format}"`);
  }
}
