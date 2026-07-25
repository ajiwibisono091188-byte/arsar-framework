import assert from 'assert';
import { CommandParser } from '../parser/command-parser.js';

console.log('--- Running Command Parser Unit Tests ---');

// Test 1: Simple command parsing
const parsed1 = CommandParser.parse('arsar generate --project yogadai');
assert.strictEqual(parsed1.commandId, 'generate');
assert.strictEqual(parsed1.options.project, 'yogadai');
console.log('✔ Test 1: Simple string token parsing passed.');

// Test 2: Double quote arguments parsing
const parsed2 = CommandParser.parse('arsar new my-spa --desc "Marketing website layout"');
assert.strictEqual(parsed2.commandId, 'new');
assert.deepStrictEqual(parsed2.args, ['my-spa']);
assert.strictEqual(parsed2.options.desc, 'Marketing website layout');
console.log('✔ Test 2: Quoted description options parsed correctly.');

console.log('🎉 PARSER TESTS COMPLETED SUCCESSFUL!\n');
