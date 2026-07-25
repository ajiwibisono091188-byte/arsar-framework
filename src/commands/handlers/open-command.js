import { BaseCommand } from '../core/base-command.js';
import { ProjectLoader } from '../../project/storage/project-loader.js';
import path from 'path';

export class OpenCommand extends BaseCommand {
  constructor() {
    super('open', 'Open Project', 'Open and parse an existing ARSAR project.');
  }

  execute(context) {
    const start = Date.now();
    const targetDir = this.args[0] || process.cwd();

    console.log(`[CLI] Opening project folder: ${targetDir}`);
    const { model, configs } = ProjectLoader.load(targetDir);

    const duration = Date.now() - start;
    console.log(`[Benchmark] Project configs loaded in ${duration}ms`);
    return Promise.resolve({ success: true, message: `Opened project "${model.name}".` });
  }

  validate(args = [], options = {}) {
    const errors = [];
    if (args.length === 0) {
      errors.push('Project directory path argument is required.');
    }
    return { isValid: errors.length === 0, errors };
  }
}
