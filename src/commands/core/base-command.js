/**
 * BaseCommand Class
 */
export class BaseCommand {
  constructor(id, name, description = '') {
    this.id = id;
    this.name = name;
    this.description = description;
    this.arguments = []; // Array of { name, required, description }
    this.options = {}; // Object of key -> { type, description, default }
  }

  /**
   * Execute command action
   * @param {Object} context CommandContext instance
   * @returns {Promise<any>}
   */
  execute(context) {
    return Promise.resolve();
  }

  /**
   * Validate parsed arguments and options
   * @returns {Object} { isValid: boolean, errors: Array }
   */
  validate(args = [], options = {}) {
    return { isValid: true, errors: [] };
  }
}
