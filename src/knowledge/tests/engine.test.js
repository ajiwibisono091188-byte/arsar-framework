import assert from 'assert';
import { KnowledgeEngine } from '../engine/knowledge-engine.js';

console.log('--- Running Knowledge Engine Unit Tests ---');

const engine = new KnowledgeEngine();

// Test 1: Active industries loaded
assert.ok(engine.industries.size > 0, 'Should load industry files from filesystem.');
console.log('✔ Test 1: Industry JSON files loaded successfully.');

// Test 2: Fetch specific industry profile
const auto = engine.getIndustry('Automotive Financing');
assert.ok(auto, 'Automotive Financing should be fetched.');
assert.strictEqual(auto.industry, 'Automotive Financing');
console.log('✔ Test 2: Industry profile fetch passed.');

// Test 3: Fetch copywriting framework meta
const pas = engine.getFramework('pas');
assert.ok(pas, 'PAS framework should be found.');
assert.strictEqual(pas.name, 'PAS');
assert.deepStrictEqual(pas.structure, ['Problem', 'Agitate', 'Solve']);
console.log('✔ Test 3: Framework metadata retrieval passed.');

console.log('🎉 KNOWLEDGE ENGINE TESTS COMPLETED SUCCESSFUL!\n');
