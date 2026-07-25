import assert from 'assert';
import { CommandRegistry } from '../registry/command-registry.js';
import { NewCommand } from '../handlers/new-command.js';
import { HelpCommand } from '../handlers/help-command.js';

console.log('--- Running Command Registry Unit Tests ---');

const registry = new CommandRegistry();

// Test 1: Register and find
registry.register(new NewCommand());
registry.register(new HelpCommand());

assert.ok(registry.find('new'));
assert.ok(registry.find('help'));
assert.strictEqual(registry.list().length, 2);
console.log('✔ Test 1: Register and lookup commands passed.');

// Test 2: Unregister command
registry.unregister('new');
assert.ok(!registry.find('new'));
assert.strictEqual(registry.list().length, 1);
console.log('✔ Test 2: Unregistering commands passed.');

console.log('🎉 REGISTRY TESTS COMPLETED SUCCESSFUL!\n');
