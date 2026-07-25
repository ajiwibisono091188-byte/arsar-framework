import assert from 'assert';
import { ExperienceComposer } from '../engine/experience-composer.js';

console.log('--- Running Experience Composer Unit Tests ---');

const composer = new ExperienceComposer();

// Mock inputs
const projectConfig = {
  goal: "Lead Generation",
  pageType: "landing",
  title: "Gadai Mudah"
};

const industryData = {
  industry: "Gadai BPKB",
  seoIntent: "transactional"
};

// Test 1: Page Blueprint composition orchestration
const blueprint = composer.compose(projectConfig, industryData);

assert.strictEqual(blueprint.pageType, 'landing');
assert.strictEqual(blueprint.goal, 'Lead Generation');
assert.strictEqual(blueprint.strategy, 'conversion', 'Should resolve strategy to conversion due to Gadai BPKB rule.');
assert.strictEqual(blueprint.layout, 'split', 'Should resolve layout to split due to rule.');
assert.deepStrictEqual(blueprint.sections, ["hero", "benefits", "testimonials", "cta", "faq", "footer"]);
console.log('✔ Test 1: Full blueprint assembly orchestration passed.');

// Test 2: Draft page composition helper
const draft = composer.composePage('blog', 'Readership');
assert.strictEqual(draft.pageType, 'blog');
assert.strictEqual(draft.goal, 'Readership');
console.log('✔ Test 2: Draft composer helper passed.');

console.log('🎉 EXPERIENCE COMPOSER TESTS COMPLETED SUCCESSFUL!\n');
