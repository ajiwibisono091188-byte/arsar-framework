import assert from 'assert';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { ProjectFactory } from '../core/project-factory.js';
import { ProjectValidator } from '../validation/project-validator.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const tempValPath = path.join(__dirname, 'temp_val_project');

console.log('--- Running Project Validator Unit Tests ---');

// Cleanup
if (fs.existsSync(tempValPath)) {
  fs.rmSync(tempValPath, { recursive: true, force: true });
}

// 1. Setup valid structure
ProjectFactory.create('Val Test', 'val-test', 'desc', tempValPath);

// 2. Validate clean structure
const resultClean = ProjectValidator.validate(tempValPath);
assert.ok(resultClean.isValid, 'Initial factory project should be 100% valid.');
console.log('✔ Test 1: Valid structure checks passed.');

// 3. Delete one config file and validate
fs.unlinkSync(path.join(tempValPath, 'company.json'));
const resultMissingFile = ProjectValidator.validate(tempValPath);
assert.ok(!resultMissingFile.isValid, 'Missing required config file should trigger validation error.');
assert.ok(
  resultMissingFile.errors.some(err => err.includes('company.json')),
  'Error log should point to missing company.json.'
);
console.log('✔ Test 2: Missing required files detection passed.');

// Clean up
if (fs.existsSync(tempValPath)) {
  fs.rmSync(tempValPath, { recursive: true, force: true });
}

console.log('🎉 VALIDATOR TESTS COMPLETED SUCCESSFUL!\n');
