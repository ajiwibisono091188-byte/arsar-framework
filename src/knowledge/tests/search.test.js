import assert from 'assert';
import { KnowledgeEngine } from '../engine/knowledge-engine.js';

console.log('--- Running Knowledge Search Unit Tests ---');

const engine = new KnowledgeEngine();

// Test 1: Search by industry name keyword
const res1 = engine.search({ industry: 'automotive' });
assert.strictEqual(res1.length, 1);
assert.strictEqual(res1[0].industry, 'Automotive Financing');
console.log('✔ Test 1: Search by industry keyword passed.');

// Test 2: Search by local keyword list
const res2 = engine.search({ keyword: 'bpkb' });
assert.strictEqual(res2.length, 1);
assert.strictEqual(res2[0].industry, 'Automotive Financing');
console.log('✔ Test 2: Search by local target keyword passed.');

// Test 3: Search by recommended framework recommendation
const res3 = engine.search({ framework: 'bab' });
assert.strictEqual(res3.length, 1);
assert.strictEqual(res3[0].industry, 'Wellness Spa');
console.log('✔ Test 3: Search by copywriting framework recommendation passed.');

console.log('🎉 KNOWLEDGE SEARCH TESTS COMPLETED SUCCESSFUL!\n');
