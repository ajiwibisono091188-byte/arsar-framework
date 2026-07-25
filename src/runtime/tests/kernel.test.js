import assert from 'assert';
import { RuntimeKernel } from '../kernel/kernel.js';
import { BaseModule } from '../modules/base-module.js';

console.log('--- Running Runtime Kernel Unit Tests ---');

// Mock module for testing
class MockModule extends BaseModule {}

// Test 1: Instantiate & boot
const kernel = new RuntimeKernel({ project: 'test-project' });
assert.strictEqual(kernel.status(), 'uninitialized');

kernel.boot();
assert.strictEqual(kernel.status(), 'booted');
console.log('✔ Test 1: Kernel boot sequence passed.');

// Test 2: Register module
kernel.register(MockModule);
assert.strictEqual(kernel.modules.length, 1);
assert.strictEqual(kernel.modules[0].status, 'initialized');
console.log('✔ Test 2: Module registration passed.');

// Test 3: Start kernel (boots and starts modules)
kernel.start();
assert.strictEqual(kernel.status(), 'running');
assert.strictEqual(kernel.modules[0].status, 'running');
console.log('✔ Test 3: Kernel start lifecycle passed.');

// Test 4: Stop kernel (stops and destroys modules)
kernel.stop();
assert.strictEqual(kernel.status(), 'stopped');
console.log('✔ Test 4: Kernel stop sequence passed.');

// Test 5: Destroy kernel
kernel.destroy();
assert.strictEqual(kernel.status(), 'destroyed');
assert.strictEqual(kernel.modules.length, 0);
console.log('✔ Test 5: Kernel destroy sequence passed.');

console.log('🎉 RUNTIME KERNEL TESTS COMPLETED SUCCESSFUL!\n');
