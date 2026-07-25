import assert from 'assert';
import { ShellRouter } from '../router/shell-router.js';

console.log('--- Running Shell Router Unit Tests ---');

const router = new ShellRouter();

// Test 1: Register route
router.addRoute('/projects', 'projects-view');
assert.strictEqual(router.getCurrentRoute(), '/');
console.log('✔ Test 1: Route registration passed.');

// Test 2: Navigate to registered route
const viewName = router.navigateTo('/projects');
assert.strictEqual(viewName, 'projects-view');
assert.strictEqual(router.getCurrentRoute(), '/projects');
console.log('✔ Test 2: Path routing navigation passed.');

// Test 3: Navigate to unregistered route throws
assert.throws(() => {
  router.navigateTo('/settings-admin');
}, /is not registered/, 'Navigating to bad route should throw error.');
console.log('✔ Test 3: Unregistered routing exceptions check passed.');

console.log('🎉 SHELL ROUTER TESTS COMPLETED SUCCESSFUL!\n');
