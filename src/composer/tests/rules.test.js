import assert from 'assert';
import { ruleEngine } from '../rules/rule-engine.js';

console.log('--- Running Rule Engine Unit Tests ---');

// Test 1: Match Gadai BPKB rule
const contextBPKB = {
  industry: 'Gadai BPKB',
  goal: 'Lead Generation'
};
const resultBPKB = ruleEngine.evaluate(contextBPKB);
assert.strictEqual(resultBPKB.strategy, 'conversion');
assert.strictEqual(resultBPKB.layout, 'split');
assert.deepStrictEqual(resultBPKB.sections, ["hero", "benefits", "testimonials", "cta", "faq", "footer"]);
console.log('✔ Test 1: Gadai BPKB Lead Generation rule triggered correctly.');

// Test 2: Match Wellness Spa rule
const contextSpa = {
  industry: 'Wellness Spa',
  pageType: 'landing'
};
const resultSpa = ruleEngine.evaluate(contextSpa);
assert.strictEqual(resultSpa.strategy, 'local-business');
assert.strictEqual(resultSpa.layout, 'alternating');
console.log('✔ Test 2: Wellness Spa rule triggered correctly.');

// Test 3: No match (returns empty object)
const contextEmpty = {
  industry: 'Generic Farming',
  goal: 'SEO'
};
const resultEmpty = ruleEngine.evaluate(contextEmpty);
assert.deepStrictEqual(resultEmpty, {}, 'Unmatched context should return empty object.');
console.log('✔ Test 3: Unmatched context checked.');

console.log('🎉 RULE ENGINE TESTS COMPLETED SUCCESSFUL!\n');
