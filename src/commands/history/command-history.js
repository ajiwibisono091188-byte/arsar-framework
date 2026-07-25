/**
 * CommandHistory Class
 */
export class CommandHistory {
  constructor() {
    this.history = [];
  }

  record(commandId, status = 'success', error = null) {
    this.history.push({
      commandId,
      status,
      error,
      timestamp: new Date().toISOString()
    });
  }

  list() {
    return this.history;
  }
}
