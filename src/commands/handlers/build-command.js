import { BaseCommand } from '../core/base-command.js';

export class BuildCommand extends BaseCommand {
  constructor() {
    super('build', 'Build Project', 'Compile site templates and assets.');
  }

  execute(context) {
    console.log('[Command Handler] Running "build" static files command...');
    return Promise.resolve({ success: true, message: 'Build complete.' });
  }
}
