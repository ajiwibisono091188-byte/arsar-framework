import assert from 'assert';
import { CommandManager } from '../command/command-manager.js';

console.log('--- Running Command Manager Unit Tests ---');

const manager = new CommandManager();

// Test 1: Register and execute command
let counter = 0;
manager.registerCommand('increment', (val) => {
  counter += val;
}, 'Increment count value');

manager.execute('increment', 5);
assert.strictEqual(counter, 5);
console.log('✔ Test 1: Register and execute command passed.');

// Test 2: Search commands list
manager.registerCommand('decrement', () => {}, 'Decrement value');

const allCmds = manager.search('');
assert.strictEqual(allCmds.length, 2);

const filtered = manager.search('incre');
assert.strictEqual(filtered.length, 1);
assert.strictEqual(filtered[0].id, 'increment');
console.log('✔ Test 2: Search queries command filtering passed.');

console.log('🎉 COMMAND MANAGER TESTS COMPLETED SUCCESSFUL!\n');
