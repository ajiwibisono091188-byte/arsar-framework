import { BaseCommand } from '../core/base-command.js';

export class GenerateCommand extends BaseCommand {
  constructor() {
    super('generate', 'Generate Landing Page', 'Execute landing content generation.');
  }

  execute(context) {
    console.log('[Command Handler] Running "generate" content command...');
    return Promise.resolve({ success: true, message: 'Content generated.' });
  }
}
