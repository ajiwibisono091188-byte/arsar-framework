import assert from 'assert';
import { loadSchema, loadExample } from '../utils/schema-utils.js';
import { SchemaCompiler } from '../compiler/schema-compiler.js';

console.log('--- Running Loader & Compiler Unit Tests ---');

// Test 1: Load schema file
const schema = loadSchema('site');
assert.strictEqual(schema.title, 'Site Schema', 'Loaded schema title should match.');
console.log('✔ Test 1: Load schema from filesystem passed.');

// Test 2: Load example file
const example = loadExample('site');
assert.ok(example.title, 'Example should have a title.');
console.log('✔ Test 2: Load example from filesystem passed.');

// Test 3: Compile and Normalize (trim spacing, parse defaults)
const rawData = {
  title: "   Arsar Digital   ", // Needs trimming
  url: "https://arsardigital.com",
  language: "id"
  // logo is missing, compiler should inject default logo "/assets/images/logo.png"
};

const compiled = SchemaCompiler.compile('site', rawData);

assert.strictEqual(compiled.title, 'Arsar Digital', 'String whitespace should be trimmed.');
assert.strictEqual(compiled.logo, '/assets/images/logo.png', 'Fallback default value should be injected.');
console.log('✔ Test 3: Spacing trim and default values injection passed.');

console.log('🎉 LOADER & COMPILER TESTS COMPLETED SUCCESSFUL!\n');
