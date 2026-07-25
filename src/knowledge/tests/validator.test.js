import assert from 'assert';
import { KnowledgeValidator } from '../validation/knowledge-validator.js';

console.log('--- Running Knowledge Validator Unit Tests ---');

// Test 1: Valid structure checks
const mockCleanData = {
  industry: "Real Estate Brokerage",
  audiences: [],
  painPoints: [{ id: "pp_1", text: "Komisi mahal" }],
  benefits: [{ id: "ben_1", text: "Komisi nego" }],
  offers: [{ id: "off_1", title: "Free Listing" }],
  objections: [{ id: "obj_1", objection: "Ribet?", rebuttal: "Tidak" }],
  cta: [{ id: "cta_1", text: "Call" }],
  keywords: ["apartemen murah"],
  faq: [{ question: "Aman?", answer: "Ya" }],
  frameworkRecommendations: ["aida", "pas"]
};

const resultClean = KnowledgeValidator.validate(mockCleanData);
assert.ok(resultClean.isValid, 'Clean mock data should pass.');
console.log('✔ Test 1: Valid database structure passed.');

// Test 2: Missing required property
const badMissingProperty = {
  industry: "Real Estate Brokerage",
  painPoints: []
  // benefits missing, etc.
};
const resultMissing = KnowledgeValidator.validate(badMissingProperty);
assert.ok(!resultMissing.isValid);
console.log('✔ Test 2: Missing required properties checked.');

// Test 3: Duplicate IDs inside lists
const badDuplicateData = {
  ...mockCleanData,
  painPoints: [
    { id: "pp_duplicate", text: "PP 1" },
    { id: "pp_duplicate", text: "PP 2" } // Duplicate ID!
  ]
};
const resultDuplicate = KnowledgeValidator.validate(badDuplicateData);
assert.ok(!resultDuplicate.isValid);
assert.ok(resultDuplicate.errors.some(err => err.includes('Duplicate ID')));
console.log('✔ Test 3: Duplicate list IDs checked.');

// Test 4: Invalid framework recommendation
const badFrameworkData = {
  ...mockCleanData,
  frameworkRecommendations: ["invalid_framework_key"] // Not registered!
};
const resultBadFramework = KnowledgeValidator.validate(badFrameworkData);
assert.ok(!resultBadFramework.isValid);
assert.ok(resultBadFramework.errors.some(err => err.includes('Not registered in framework library')));
console.log('✔ Test 4: Invalid framework recommendations checks passed.');

console.log('🎉 KNOWLEDGE VALIDATOR TESTS COMPLETED SUCCESSFUL!\n');
