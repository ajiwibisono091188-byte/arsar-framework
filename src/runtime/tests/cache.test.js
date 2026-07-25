import assert from 'assert';
import { MemoryCache } from '../cache/memory-cache.js';

console.log('--- Running Memory Cache Unit Tests ---');

const cache = new MemoryCache();

// Test 1: Set and Get
cache.set('key1', 'value1');
assert.strictEqual(cache.get('key1'), 'value1');
assert.ok(cache.has('key1'));
console.log('✔ Test 1: Simple set and get passed.');

// Test 2: Delete
cache.delete('key1');
assert.ok(!cache.has('key1'));
assert.strictEqual(cache.get('key1'), null);
console.log('✔ Test 2: Deleting cached key passed.');

// Test 3: Clear
cache.set('key2', 'value2');
cache.set('key3', 'value3');
cache.clear();
assert.ok(!cache.has('key2'));
assert.ok(!cache.has('key3'));
console.log('✔ Test 3: Clearing cache passed.');

// Test 4: TTL Expiration
cache.set('key_ttl', 'temp_value', 50); // 50ms TTL
assert.strictEqual(cache.get('key_ttl'), 'temp_value');

// Wait 100ms and check again
setTimeout(() => {
  assert.ok(!cache.has('key_ttl'), 'Expired TTL item should not exist.');
  assert.strictEqual(cache.get('key_ttl'), null, 'Expired TTL item should resolve to null.');
  console.log('✔ Test 4: TTL Expiration checks passed.');
  console.log('🎉 MEMORY CACHE TESTS COMPLETED SUCCESSFUL!\n');
}, 100);
