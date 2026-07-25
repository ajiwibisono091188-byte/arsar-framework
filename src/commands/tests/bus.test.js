import assert from 'assert';
import { CommandBus } from '../bus/command-bus.js';
import { CommandRegistry } from '../registry/command-registry.js';
import { VersionCommand } from '../handlers/version-command.js';
import { CommandContext } from '../context/command-context.js';

console.log('--- Running Command Bus Unit Tests ---');

const registry = new CommandRegistry();
registry.register(new VersionCommand());

const bus = new CommandBus(registry);

// Test 1: Execute version command
const context = new CommandContext();
bus.execute('version', [], {}, context).then((res) => {
  assert.strictEqual(res.success, true);
  assert.strictEqual(res.version, '2.0.0');
  console.log('✔ Test 1: Command Bus lookup and execution passed.');
});
