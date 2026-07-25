import { BaseCommand } from '../core/base-command.js';
import { ProjectFactory } from '../../project/core/project-factory.js';
import path from 'path';

export class NewCommand extends BaseCommand {
  constructor() {
    super('new', 'Create Project', 'Initialize a new ARSAR project structure.');
  }

  execute(context) {
    const start = Date.now();
    const name = this.args[0] || 'My New Project';
    const id = this.args[1] || 'my-new-project';
    const targetDir = this.options.dir || path.join(process.cwd(), id);

    console.log(`[CLI] Initializing project "${name}" in: ${targetDir}`);
    ProjectFactory.create(name, id, 'Project created via CLI new command.', targetDir);
    
    const duration = Date.now() - start;
    console.log(`[Benchmark] Project load & creation completed in ${duration}ms`);
    return Promise.resolve({ success: true, message: `Project initialized at ${targetDir}` });
  }

  validate(args = [], options = {}) {
    const errors = [];
    if (args.length === 0) {
      errors.push('Project name argument is required.');
    }
    return { isValid: errors.length === 0, errors };
  }
}
