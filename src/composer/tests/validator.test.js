import assert from 'assert';
import { BlueprintValidator } from '../validation/blueprint-validator.js';

console.log('--- Running Blueprint Validator Unit Tests ---');

const mockCleanBlueprint = {
  pageType: "landing",
  goal: "Lead Generation",
  strategy: "conversion",
  layout: "split",
  sections: ["hero", "benefits", "cta", "footer"], // Correct priority ordering: 10 -> 20 -> 100 -> 200
  metadata: { title: "Test Title" },
  dependencies: []
};

// Test 1: Valid blueprint
const resClean = BlueprintValidator.validate(mockCleanBlueprint);
assert.ok(resClean.isValid, 'Clean sorted blueprint should pass validation.');
console.log('✔ Test 1: Clean blueprint checked.');

// Test 2: Duplicate section ID
const badDuplicate = {
  ...mockCleanBlueprint,
  sections: ["hero", "benefits", "benefits", "footer"] // Duplicate benefits!
};
const resDup = BlueprintValidator.validate(badDuplicate);
assert.ok(!resDup.isValid);
assert.ok(resDup.errors.some(err => err.includes('Duplicate section id')));
console.log('✔ Test 2: Duplicate section detection checked.');

// Test 3: Bad sorting order (footer placed before hero)
const badOrder = {
  ...mockCleanBlueprint,
  sections: ["footer", "hero"] // Footer (200) before Hero (10)
};
const resOrder = BlueprintValidator.validate(badOrder);
assert.ok(!resOrder.isValid);
assert.ok(resOrder.errors.some(err => err.includes('Invalid section ordering')));
console.log('✔ Test 3: Invalid sorting order checks passed.');

console.log('🎉 BLUEPRINT VALIDATOR TESTS COMPLETED SUCCESSFUL!\n');
