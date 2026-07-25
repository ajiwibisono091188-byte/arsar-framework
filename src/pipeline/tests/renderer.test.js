import assert from 'assert';
import { Renderer } from '../renderer/renderer.js';

console.log('--- Running Renderer Unit Tests ---');

const mockBlueprint = {
  pageType: "landing",
  sections: ["hero", "benefits", "cta"]
};

const mockProjectData = {
  company: { name: "Test Corp", legalName: "PT Test Corp Indonesia" },
  seo: { defaultTitle: "Test Meta Title" },
  brand: { primaryColor: "#ff0000" }
};

const html = Renderer.render(mockBlueprint, mockProjectData);

assert.ok(html.includes('Test Meta Title'), 'Meta Title should be rendered.');
assert.ok(html.includes('PT Test Corp Indonesia'), 'Company name legal description should be rendered.');
assert.ok(html.includes('id="hero"'), 'Hero section ID tag should be present.');
assert.ok(html.includes('id="features"'), 'Benefits section ID tag should be present.');
assert.ok(html.includes('id="contact"'), 'CTA section ID tag should be present.');

console.log('✔ Test 1: Renderer compiled HTML file structure successfully.');
console.log('🎉 RENDERER TESTS COMPLETED SUCCESSFUL!\n');
