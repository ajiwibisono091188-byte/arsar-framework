import assert from 'assert';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { SEOOutputGenerator } from '../seo/seo-output-generator.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const tempSeoOut = path.join(__dirname, 'temp_seo_out');

console.log('--- Running SEO Output Unit Tests ---');

// Clean
if (fs.existsSync(tempSeoOut)) {
  fs.rmSync(tempSeoOut, { recursive: true, force: true });
}

fs.mkdirSync(tempSeoOut);

// 1. Generate SEO files
const projectData = {
  seo: { domain: "https://myyogadai.com" },
  company: { name: "YogaDAI", legalName: "PT YogaDAI Indonesia", email: "support@yogadai.com" }
};

const scriptTag = SEOOutputGenerator.generate(tempSeoOut, projectData);

// 2. Verify files exist
assert.ok(fs.existsSync(path.join(tempSeoOut, 'robots.txt')));
assert.ok(fs.existsSync(path.join(tempSeoOut, 'sitemap.xml')));

// 3. Verify Robots content
const robots = fs.readFileSync(path.join(tempSeoOut, 'robots.txt'), 'utf8');
assert.ok(robots.includes('Sitemap: https://myyogadai.com/sitemap.xml'));

// 4. Verify Sitemap content
const sitemap = fs.readFileSync(path.join(tempSeoOut, 'sitemap.xml'), 'utf8');
assert.ok(sitemap.includes('https://myyogadai.com/'));

// 5. Verify JSON-LD script
assert.ok(scriptTag.includes('<script type="application/ld+json">'));
assert.ok(scriptTag.includes('PT YogaDAI Indonesia'));

console.log('✔ Test 1: SEO files and LD-JSON scripts verified successfully.');

// Clean
if (fs.existsSync(tempSeoOut)) {
  fs.rmSync(tempSeoOut, { recursive: true, force: true });
}

console.log('🎉 SEO OUTPUT TESTS COMPLETED SUCCESSFUL!\n');
