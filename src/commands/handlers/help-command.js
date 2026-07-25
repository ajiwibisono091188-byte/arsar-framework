import { BaseCommand } from '../core/base-command.js';

export class HelpCommand extends BaseCommand {
  constructor() {
    super('help', 'Help Manual', 'List all registered commands.');
  }

  execute(context) {
    console.log('[Command Handler] Running "help" command...');
    return Promise.resolve({ success: true, message: 'Help info printed.' });
  }
}
