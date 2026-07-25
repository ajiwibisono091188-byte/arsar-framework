/**
 * CommandRegistry Class
 */
export class CommandRegistry {
  constructor() {
    this.commands = new Map();
  }

  register(command) {
    if (!command.id) {
      throw new Error('[Command Registry] Command must have an ID.');
    }
    this.commands.set(command.id.toLowerCase(), command);
  }

  unregister(id) {
    this.commands.delete(id.toLowerCase());
  }

  find(id) {
    return this.commands.get(id.toLowerCase());
  }

  list() {
    return Array.from(this.commands.values());
  }
}
