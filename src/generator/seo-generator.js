import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const srcDir = path.resolve(__dirname, '..');
const publicDir = path.join(srcDir, 'public');

// Ensure public directory exists
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Load company/SEO configuration
const readJson = (file) => JSON.parse(fs.readFileSync(path.join(srcDir, file), 'utf8'));
const company = readJson('config/company.json');
const seoConfig = readJson('config/seo.json');

const siteUrl = company.website || 'https://arsardigital.com';

// Recursively find HTML files inside a directory to generate sitemap URLs
function findHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (file !== 'node_modules' && file !== 'dist' && file !== 'public') {
        findHtmlFiles(fullPath, fileList);
      }
    } else if (file.endsWith('.html')) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

export function generateSeoFiles() {
  console.log('[SEO Generator] Scanning pages for sitemap...');
  
  // 1. Generate sitemap.xml
  try {
    const htmlFiles = findHtmlFiles(srcDir);
    let sitemapUrls = '';
    
    htmlFiles.forEach((file) => {
      // Get relative path from src/
      let relPath = path.relative(srcDir, file).replace(/\\/g, '/');
      
      // If it is index.html, it represents the root URL
      if (relPath === 'index.html') {
        relPath = '';
      }
      
      const pageUrl = `${siteUrl}/${relPath}`;
      const lastMod = new Date().toISOString().split('T')[0];
      
      sitemapUrls += `  <url>
    <loc>${pageUrl}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>${seoConfig.sitemap?.changefreq || 'weekly'}</changefreq>
    <priority>${relPath === '' ? '1.0' : seoConfig.sitemap?.priority || '0.8'}</priority>
  </url>\n`;
    });

    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls}</urlset>`;

    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapContent, 'utf8');
    console.log('[SEO Generator] Generated: public/sitemap.xml');
  } catch (error) {
    console.error('[SEO Generator] Error generating sitemap.xml:', error);
  }

  // 2. Generate robots.txt
  try {
    const robotsContent = `# Robots.txt for ARSAR AI Marketing OS
User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;
    fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsContent, 'utf8');
    console.log('[SEO Generator] Generated: public/robots.txt');
  } catch (error) {
    console.error('[SEO Generator] Error generating robots.txt:', error);
  }
}

// Auto-run when executed directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  generateSeoFiles();
}
