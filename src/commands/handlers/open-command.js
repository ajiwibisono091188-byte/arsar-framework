import { BaseCommand } from '../core/base-command.js';

export class OpenCommand extends BaseCommand {
  constructor() {
    super('open', 'Open Project', 'Open an existing ARSAR project.');
  }

  execute(context) {
    console.log('[Command Handler] Running "open" project command...');
    return Promise.resolve({ success: true, message: 'Project opened.' });
  }
}
