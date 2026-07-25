import { BaseCommand } from '../core/base-command.js';

export class PreviewCommand extends BaseCommand {
  constructor() {
    super('preview', 'Preview Site', 'Start local browser visual preview server.');
  }

  execute(context) {
    console.log('[Command Handler] Running "preview" server command...');
    return Promise.resolve({ success: true, message: 'Preview server started.' });
  }
}
