import assert from 'assert';
import { promptRegistry } from '../prompts/prompt-registry.js';
import { promptCompiler } from '../compiler/prompt-compiler.js';

console.log('--- Running Prompt Registry & Compiler Unit Tests ---');

// Test 1: Registry load
const list = promptRegistry.list();
assert.ok(list.length > 0, 'Should load prompt markdown files.');
console.log('✔ Test 1: Prompt listing passed.');

// Test 2: Compiler placeholder replacement
const template = 'Halo {{company}} dari {{location}}, produk kami adalah {{usp}}';
const data = {
  company: 'Arsar Digital',
  location: 'Surabaya',
  usp: 'AI Marketing SSG'
};

const compiled = promptCompiler.compile(template, data);
assert.strictEqual(
  compiled,
  'Halo Arsar Digital dari Surabaya, produk kami adalah AI Marketing SSG',
  'Placeholders must be compiled accurately.'
);
console.log('✔ Test 2: Placeholder compiler passed.');

console.log('🎉 REGISTRY & COMPILER TESTS COMPLETED SUCCESSFUL!\n');
