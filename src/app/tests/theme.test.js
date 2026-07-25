import assert from 'assert';
import { ThemeManager } from '../theme/theme-manager.js';

console.log('--- Running Theme Manager Unit Tests ---');

const manager = new ThemeManager();
assert.strictEqual(manager.getTheme(), 'system');

// Test 1: Set Dark theme
manager.setTheme('dark');
assert.strictEqual(manager.getTheme(), 'dark');
console.log('✔ Test 1: Dark theme set passed.');

// Test 2: Set Light theme
manager.setTheme('light');
assert.strictEqual(manager.getTheme(), 'light');
console.log('✔ Test 2: Light theme set passed.');

// Test 3: Invalid theme throws error
assert.throws(() => {
  manager.setTheme('transparent');
}, /Invalid theme mode/, 'Setting invalid theme should throw error.');
console.log('✔ Test 3: Invalid theme exceptions check passed.');

console.log('🎉 THEME MANAGER TESTS COMPLETED SUCCESSFUL!\n');
