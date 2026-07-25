import assert from 'assert';
import { ApplicationShell } from '../shell/application-shell.js';

console.log('--- Running Application Shell Unit Tests ---');

const shell = new ApplicationShell();
shell.initialize();

// Test 1: Register and resolve custom module
const mockModule = { path: '/custom-page', view: 'mock-view' };
shell.registerModule('custom_mod', mockModule);

assert.ok(shell.modules.has('custom_mod'));

// Open workspace
const opened = shell.openWorkspace('custom_mod');
assert.strictEqual(opened.view, 'mock-view');
assert.strictEqual(shell.router.getCurrentRoute(), '/custom-page', 'Router should update on workspace opening.');
console.log('✔ Test 1: Module registration and routing workspace passed.');

// Test 2: Triggering hotkey command
let commandFired = false;
shell.commands.registerCommand('test-hotkey', () => {
  commandFired = true;
});
shell.shortcuts.bind('ctrl+h', () => shell.executeCommand('test-hotkey'));

shell.shortcuts.trigger('ctrl+h');
assert.ok(commandFired);
console.log('✔ Test 2: Shortcuts hotkey command binding passed.');

console.log('🎉 APPLICATION SHELL TESTS COMPLETED SUCCESSFUL!\n');
