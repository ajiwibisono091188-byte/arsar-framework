/**
 * CommandManager Class
 */
export class CommandManager {
  constructor() {
    this.commands = new Map();
  }

  /**
   * Register a new command
   * @param {String} id 
   * @param {Function} callback 
   * @param {String} name Friendly description
   */
  registerCommand(id, callback, name = '') {
    if (typeof callback !== 'function') {
      throw new Error(`[Command Manager] Callback for command "${id}" must be a function.`);
    }
    this.commands.set(id.toLowerCase(), {
      id: id.toLowerCase(),
      callback,
      name: name || id
    });
  }

  /**
   * Execute command by ID
   */
  execute(id, ...args) {
    const cmd = this.commands.get(id.toLowerCase());
    if (!cmd) {
      throw new Error(`[Command Manager] Command "${id}" is not registered.`);
    }
    return cmd.callback(...args);
  }

  /**
   * Search commands
   * @param {String} query 
   * @returns {Array} List of matched command objects
   */
  search(query = '') {
    const list = Array.from(this.commands.values());
    if (!query || query.trim() === '') return list;

    const term = query.toLowerCase();
    return list.filter((cmd) => {
      return cmd.id.includes(term) || cmd.name.toLowerCase().includes(term);
    });
  }
}
