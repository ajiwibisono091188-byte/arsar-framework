import assert from 'assert';
import { ServiceContainer } from '../container/service-container.js';

console.log('--- Running Service Container Unit Tests ---');

const container = new ServiceContainer();

// Test 1: Register and resolve transient service
container.register('transient_service', () => ({ value: Math.random() }));
const t1 = container.resolve('transient_service');
const t2 = container.resolve('transient_service');
assert.notDeepStrictEqual(t1, t2, 'Transient services should return new instances.');
console.log('✔ Test 1: Transient factory resolution passed.');

// Test 2: Register and resolve singleton service
container.singleton('singleton_service', () => ({ value: Math.random() }));
const s1 = container.resolve('singleton_service');
const s2 = container.resolve('singleton_service');
assert.strictEqual(s1, s2, 'Singleton services should return the exact same instance.');
console.log('✔ Test 2: Singleton resolution passed.');

// Test 3: Check dependency injection inside factory resolver
container.singleton('dependency', 'inject_me');
container.register('dependent_service', (c) => {
  const dep = c.resolve('dependency');
  return `resolved_${dep}`;
});

const result = container.resolve('dependent_service');
assert.strictEqual(result, 'resolved_inject_me', 'Container should resolve nested dependencies.');
console.log('✔ Test 3: Nested dependency injection resolution passed.');

// Test 4: Check has() and remove()
assert.ok(container.has('dependency'));
container.remove('dependency');
assert.ok(!container.has('dependency'));
console.log('✔ Test 4: Service removal and existence checks passed.');

console.log('🎉 SERVICE CONTAINER TESTS COMPLETED SUCCESSFUL!\n');
