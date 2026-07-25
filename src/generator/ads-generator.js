import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const srcDir = path.resolve(__dirname, '..');

// Load configurations
const readJson = (file) => JSON.parse(fs.readFileSync(path.join(srcDir, file), 'utf8'));
const company = readJson('config/company.json');

// Mock list of advertising campaigns
const campaigns = [
  { id: 'google_search_brand', utmSource: 'google', utmMedium: 'cpc', utmCampaign: 'brand_awareness' },
  { id: 'facebook_retargeting', utmSource: 'facebook', utmMedium: 'cpc', utmCampaign: 'retargeting_leads' },
  { id: 'tiktok_influencer_01', utmSource: 'tiktok', utmMedium: 'influencer', utmCampaign: 'launch_promo' }
];

export function generateCampaignLinks() {
  console.log('[Ads Generator] Building optimized ad campaign URLs...');
  const siteUrl = company.website || 'https://arsardigital.com';
  
  const campaignLinks = campaigns.map((campaign) => {
    const trackingParams = new URLSearchParams({
      utm_source: campaign.utmSource,
      utm_medium: campaign.utmMedium,
      utm_campaign: campaign.utmCampaign
    });
    
    return {
      campaignId: campaign.id,
      originalUrl: siteUrl,
      finalAdUrl: `${siteUrl}?${trackingParams.toString()}`
    };
  });

  // Save compiled links to a output file inside configs for reference/reporting
  const outputPath = path.join(srcDir, 'config', 'campaign_links_generated.json');
  fs.writeFileSync(outputPath, JSON.stringify(campaignLinks, null, 2), 'utf8');
  console.log(`[Ads Generator] Created campaign links report: config/campaign_links_generated.json`);
}

// Auto-run when executed directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  generateCampaignLinks();
}
