import { BaseCommand } from '../core/base-command.js';

export class VersionCommand extends BaseCommand {
  constructor() {
    super('version', 'Framework Version', 'Output active framework version.');
  }

  execute(context) {
    console.log('[Command Handler] Running "version" command...');
    return Promise.resolve({ success: true, version: '2.0.0' });
  }
}
