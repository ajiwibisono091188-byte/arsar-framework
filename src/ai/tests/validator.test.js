import assert from 'assert';
import { responseValidator } from '../validator/response-validator.js';

console.log('--- Running AI Response Validator Unit Tests ---');

// Test 1: Valid expectation
const validResponse = '{"title": "Arsar", "description": "High performance"}';
const rules = { json: true, requiredFields: ['title', 'description'], minLength: 10 };

const res1 = responseValidator.validate(validResponse, rules);
assert.ok(res1.isValid, 'Valid response should pass.');
console.log('✔ Test 1: Valid response checks passed.');

// Test 2: Malformed JSON failure
const badJson = '{"title": "Arsar", "description": "High performance"'; // Missing closing brace
const res2 = responseValidator.validate(badJson, rules);
assert.ok(!res2.isValid, 'Malformed JSON should fail.');
assert.ok(res2.errors.some(err => err.includes('not a valid JSON')), 'Error message should report bad JSON format.');
console.log('✔ Test 2: JSON format failure detection passed.');

// Test 3: Missing required field failure
const missingField = '{"title": "Arsar"}'; // Missing description
const res3 = responseValidator.validate(missingField, rules);
assert.ok(!res3.isValid, 'Missing required field should fail.');
assert.ok(res3.errors.some(err => err.includes('Required field "description"')), 'Error message should point to missing field.');
console.log('✔ Test 3: Missing fields detection passed.');

console.log('🎉 RESPONSE VALIDATOR TESTS COMPLETED SUCCESSFUL!\n');
