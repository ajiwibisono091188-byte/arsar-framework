import assert from 'assert';
import { layoutRegistry } from '../layouts/layout-registry.js';
import { strategyRegistry } from '../strategies/strategy-registry.js';

console.log('--- Running Layout & Strategy Registries Unit Tests ---');

// Test 1: Layout listings
const layouts = layoutRegistry.list();
assert.ok(layouts.length > 0);
assert.ok(layoutRegistry.get('split') !== null);
console.log('✔ Test 1: Layout Registry parsed successfully.');

// Test 2: Strategy listings
const strategies = strategyRegistry.list();
assert.ok(strategies.length > 0);
assert.ok(strategyRegistry.get('lead-generation') !== null);
console.log('✔ Test 2: Strategy Registry parsed successfully.');

console.log('🎉 REGISTRIES TESTS COMPLETED SUCCESSFUL!\n');
