import assert from 'assert';
import { registry } from '../registry/schema-registry.js';

console.log('--- Running Registry Unit Tests ---');

// Test 1: Check initial schemas loaded
assert.ok(registry.list().length > 0, 'Registry should load app schemas on init.');
console.log('✔ Test 1: Registry load on init passed.');

// Test 2: Check standard schema exists
assert.ok(registry.exists('site'), 'Schema "site" should exist.');
assert.ok(registry.get('site') !== null, 'Schema "site" object should be retrievable.');
console.log('✔ Test 2: Schema retrieval passed.');

// Test 3: Custom schema registration
const mockSchema = { title: "Custom Test", properties: {} };
registry.register('test_mock', mockSchema);
assert.ok(registry.exists('test_mock'), 'Custom schema should exist after registration.');
assert.deepStrictEqual(registry.get('test_mock'), mockSchema, 'Retrieved custom schema should match registered object.');
console.log('✔ Test 3: Custom registration passed.');

// Test 4: Unregister schema
registry.unregister('test_mock');
assert.ok(!registry.exists('test_mock'), 'Custom schema should not exist after unregistering.');
console.log('✔ Test 4: Unregistering schema passed.');

console.log('🎉 REGISTRY TESTS COMPLETED SUCCESSFUL!\n');
