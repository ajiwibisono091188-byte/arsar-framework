import nunjucks from 'nunjucks';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const srcDir = path.resolve(__dirname, '..');
const outputPagesDir = path.join(srcDir, 'pages');

// Ensure output pages directory exists
if (!fs.existsSync(outputPagesDir)) {
  fs.mkdirSync(outputPagesDir, { recursive: true });
}

// Load configurations
const readJson = (file) => JSON.parse(fs.readFileSync(path.join(srcDir, file), 'utf8'));

const theme = readJson('config/theme.json');
const company = readJson('config/company.json');
const tracking = readJson('config/tracking.json');
const seo = readJson('config/seo.json');
const navigation = readJson('config/navigation.json');

// Load dynamic data
const cities = readJson('data/cities.json');
const services = readJson('data/services.json');
const faq = readJson('data/faq.json');
const testimonials = readJson('data/testimonials.json');

// Configure Nunjucks environment
const env = new nunjucks.Environment(new nunjucks.FileSystemLoader(srcDir), {
  autoescape: true,
  noCache: true
});

// Helper for rendering
function renderAndSave(templatePath, outputPath, context) {
  try {
    const rendered = env.render(templatePath, context);
    fs.writeFileSync(outputPath, rendered, 'utf8');
    console.log(`[Generator] Generated: ${path.relative(srcDir, outputPath)}`);
  } catch (error) {
    console.error(`[Generator] Error rendering ${templatePath}:`, error);
  }
}

// 1. Generate Home Page (index.html) in the src/ root
const homeContext = {
  theme,
  company,
  tracking,
  seo: {
    ...seo,
    defaultTitle: seo.defaultTitle,
    defaultDescription: seo.defaultDescription
  },
  navigation,
  services,
  faq,
  testimonials,
  breadcrumbs: [],
  pageUrl: company.website
};

renderAndSave('layouts/landing.njk', path.join(srcDir, 'index.html'), homeContext);

// 2. Generate Local SEO Pages (e.g. src/pages/jakarta.html)
cities.forEach((city) => {
  const localContext = {
    theme,
    company,
    tracking,
    seo: {
      ...seo,
      defaultTitle: `Jasa ${services[0].title} Terbaik di ${city.name} - ${company.name}`,
      defaultDescription: `Hubungi kami untuk layanan digital marketing di ${city.name}. ${city.keywords.join(', ')}.`
    },
    navigation,
    services,
    faq,
    testimonials,
    city,
    breadcrumbs: [
      { name: city.name, url: `${company.website}/${city.slug}` }
    ],
    pageUrl: `${company.website}/${city.slug}`
  };

  const outputPath = path.join(outputPagesDir, `${city.slug}.html`);
  renderAndSave('layouts/landing.njk', outputPath, localContext);
});

console.log('[Generator] Landing pages generation completed.');
