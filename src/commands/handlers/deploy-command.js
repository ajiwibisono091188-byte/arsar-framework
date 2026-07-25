import { BaseCommand } from '../core/base-command.js';

export class DeployCommand extends BaseCommand {
  constructor() {
    super('deploy', 'Deploy Site', 'Deploy static folder output to cloud.');
  }

  execute(context) {
    console.log('[Command Handler] Running "deploy" site command...');
    return Promise.resolve({ success: true, message: 'Deployment finished.' });
  }
}
