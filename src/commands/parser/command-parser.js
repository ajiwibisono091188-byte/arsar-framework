/**
 * CommandParser Class
 */
export class CommandParser {
  /**
   * Parse a command line string into structured tokens
   * @param {String} inputString CLI input (e.g. "arsar generate --project yogadai")
   * @returns {Object} { commandId, args, options }
   */
  static parse(inputString = '') {
    if (!inputString || typeof inputString !== 'string') {
      return { commandId: '', args: [], options: {} };
    }

    // Regex to split by space, respecting single/double quotes
    const regex = /[^\s"']+|"([^"]*)"|'([^']*)'/g;
    const tokens = [];
    let match;
    while ((match = regex.exec(inputString)) !== null) {
      tokens.push(match[1] || match[2] || match[0]);
    }

    // Strip "arsar" binary prefix if present
    if (tokens[0] === 'arsar') {
      tokens.shift();
    }

    if (tokens.length === 0) {
      return { commandId: '', args: [], options: {} };
    }

    const commandId = tokens.shift();
    const args = [];
    const options = {};

    let i = 0;
    while (i < tokens.length) {
      const token = tokens[i];
      if (token.startsWith('--')) {
        const key = token.substring(2);
        if (i + 1 < tokens.length && !tokens[i + 1].startsWith('-')) {
          options[key] = tokens[i + 1];
          i += 2;
        } else {
          options[key] = true;
          i += 1;
        }
      } else if (token.startsWith('-')) {
        const key = token.substring(1);
        if (i + 1 < tokens.length && !tokens[i + 1].startsWith('-')) {
          options[key] = tokens[i + 1];
          i += 2;
        } else {
          options[key] = true;
          i += 1;
        }
      } else {
        args.push(token);
        i += 1;
      }
    }

    return {
      commandId: commandId.toLowerCase(),
      args,
      options
    };
  }
}
