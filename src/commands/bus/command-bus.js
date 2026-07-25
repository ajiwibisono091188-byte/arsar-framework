import { CommandRegistry } from '../registry/command-registry.js';

/**
 * CommandBus Class
 */
export class CommandBus {
  /**
   * @param {CommandRegistry} registry 
   * @param {Object} eventBus Optional EventBus instance
   */
  constructor(registry = new CommandRegistry(), eventBus = null) {
    this.registry = registry;
    this.eventBus = eventBus;
    this.middlewares = [];
    this.commandQueue = [];
  }

  /**
   * Helper to emit event signals
   */
  emit(event, ...args) {
    if (this.eventBus) {
      this.eventBus.emit(event, ...args);
    } else {
      console.log(`[Command Bus Event] ${event}:`, ...args);
    }
  }

  use(middleware) {
    this.middlewares.push(middleware);
  }

  /**
   * Dispatch a Command instance through middlewares
   * @param {BaseCommand} command 
   * @param {CommandContext} context 
   */
  async dispatch(command, context) {
    this.emit('command.started', command.id);
    let index = 0;

    const executeChain = async () => {
      if (index < this.middlewares.length) {
        const mw = this.middlewares[index++];
        return mw.handle(command, context, executeChain);
      }
      return command.execute(context);
    };

    try {
      const result = await executeChain();
      this.emit('command.completed', command.id);
      return result;
    } catch (err) {
      this.emit('command.failed', command.id, err.message);
      throw err;
    }
  }

  /**
   * Look up registry and execute by raw arguments and options
   */
  async execute(id, args = [], options = {}, context = {}) {
    const cmd = this.registry.find(id);
    if (!cmd) {
      throw new Error(`[Command Bus] Command "${id}" is not registered.`);
    }
    // Bind arguments and options to command instance for validation/middlewares
    cmd.args = args;
    cmd.options = options;
    return this.dispatch(cmd, context);
  }

  queue(command, context) {
    this.commandQueue.push({ command, context });
    console.log(`[Command Bus] Queued command: "${command.id}"`);
  }

  cancel() {
    this.commandQueue = [];
    console.log('[Command Bus] Command queue cancelled.');
  }
}
