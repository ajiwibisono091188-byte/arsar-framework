import assert from 'assert';
import { KeywordPlanner } from '../keywords/keyword-planner.js';

console.log('--- Running Keyword Planner Unit Tests ---');

const input = {
  company: "YogaDAI",
  offer: "Gadai BPKB",
  location: "Surabaya"
};

const plan = KeywordPlanner.plan(input);

assert.ok(plan.brand.length > 0);
assert.ok(plan.generic.length > 0);
assert.ok(plan.localIntent.length > 0);
assert.ok(plan.commercialIntent.length > 0);
assert.ok(plan.negativeKeywords.length > 0);

assert.ok(plan.localIntent[0].includes('surabaya'));
console.log('✔ Test 1: Keywords parsed and categorized successfully.');

console.log('🎉 KEYWORD TESTS COMPLETED SUCCESSFUL!\n');
