import { BaseCommand } from '../core/base-command.js';

export class NewCommand extends BaseCommand {
  constructor() {
    super('new', 'Create Project', 'Initialize a new ARSAR project structure.');
  }

  execute(context) {
    console.log('[Command Handler] Running "new" project command...');
    return Promise.resolve({ success: true, message: 'Project initialized.' });
  }
}
