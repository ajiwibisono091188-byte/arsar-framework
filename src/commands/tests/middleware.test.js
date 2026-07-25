import assert from 'assert';
import { CommandBus } from '../bus/command-bus.js';
import { CommandRegistry } from '../registry/command-registry.js';
import { VersionCommand } from '../handlers/version-command.js';
import { CommandContext } from '../context/command-context.js';

console.log('--- Running Command Middleware Unit Tests ---');

const registry = new CommandRegistry();
registry.register(new VersionCommand());

const bus = new CommandBus(registry);

// Test 1: Middleware pipeline chain execution
let middlewareRunOrder = [];

class DummyMiddleware {
  constructor(name) { this.name = name; }
  async handle(command, context, next) {
    middlewareRunOrder.push(`before-${this.name}`);
    const res = await next();
    middlewareRunOrder.push(`after-${this.name}`);
    return res;
  }
}

bus.use(new DummyMiddleware('one'));
bus.use(new DummyMiddleware('two'));

const context = new CommandContext();
bus.execute('version', [], {}, context).then((res) => {
  assert.deepStrictEqual(middlewareRunOrder, [
    'before-one',
    'before-two',
    'after-two',
    'after-one'
  ]);
  console.log('✔ Test 1: Middleware onion pipeline execution order validated.');
  console.log('🎉 MIDDLEWARE TESTS COMPLETED SUCCESSFUL!\n');
});
