import fs from 'fs';
import path from 'path';

/**
 * SEOOutputGenerator Class
 */
export class SEOOutputGenerator {
  /**
   * Write robots.txt and sitemap.xml to output folder
   * @param {String} outDir Target output directory
   * @param {Object} projectData Config data dictionary (seo, company, etc.)
   */
  static generate(outDir, projectData = {}) {
    const seo = projectData.seo || {};
    const company = projectData.company || {};
    
    const domain = seo.domain || 'https://arsardigital.com';

    // 1. Generate robots.txt
    const robotsTxt = `User-agent: *
Allow: /
Sitemap: ${domain}/sitemap.xml
`;
    fs.writeFileSync(path.join(outDir, 'robots.txt'), robotsTxt, 'utf8');

    // 2. Generate sitemap.xml
    const today = new Date().toISOString().split('T')[0];
    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${domain}/</loc>
    <lastmod>${today}</lastmod>
    <priority>1.0</priority>
  </url>
</urlset>
`;
    fs.writeFileSync(path.join(outDir, 'sitemap.xml'), sitemapXml, 'utf8');

    // 3. Generate JSON-LD script string
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": company.name || "Arsar Digital",
      "legalName": company.legalName || "PT Arsar Digital Indonesia",
      "url": domain,
      "email": company.email || "hello@arsardigital.com",
      "telephone": company.phone || "+6281234567890"
    };

    console.log('[SEO Generator] Successfully generated robots.txt, sitemap.xml, and LD-JSON scripts.');
    return `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`;
  }
}
