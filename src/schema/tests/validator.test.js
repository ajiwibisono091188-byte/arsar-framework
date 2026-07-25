import assert from 'assert';
import { SchemaValidator, validateAppSchema } from '../validators/schema-validator.js';

console.log('--- Running Validator Unit Tests ---');

// Test 1: Validate correct site data
const validSite = {
  title: "Test Site",
  url: "https://example.com",
  language: "id"
};
const resultValid = validateAppSchema('site', validSite);
assert.ok(resultValid.isValid, 'Valid site data should pass validation.');
console.log('✔ Test 1: Valid schema pass test passed.');

// Test 2: Validate invalid format (bad url)
const invalidSiteUrl = {
  title: "Test Site",
  url: "invalid-url-string",
  language: "id"
};
const resultBadUrl = validateAppSchema('site', invalidSiteUrl);
assert.ok(!resultBadUrl.isValid, 'Invalid URL format should fail validation.');
assert.ok(resultBadUrl.errors.some(err => err.path === 'site.url'), 'Error path should point to site.url.');
console.log('✔ Test 2: Bad URL failure test passed.');

// Test 3: Validate missing required fields
const missingFieldsSite = {
  title: "Test Site"
};
const resultMissing = validateAppSchema('site', missingFieldsSite);
assert.ok(!resultMissing.isValid, 'Missing required fields should fail validation.');
assert.ok(resultMissing.errors.some(err => err.path === 'site.url'), 'Error path should show missing url.');
console.log('✔ Test 3: Missing fields failure test passed.');

console.log('🎉 VALIDATOR TESTS COMPLETED SUCCESSFUL!\n');
