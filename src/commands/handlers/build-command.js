import { BaseCommand } from '../core/base-command.js';
import { PipelineEngine } from '../../pipeline/engine/pipeline-engine.js';
import path from 'path';

export class BuildCommand extends BaseCommand {
  constructor() {
    super('build', 'Build Site', 'Compile site assets and render HTML layout.');
  }

  async execute(context) {
    const start = Date.now();
    const projectPath = this.args[0] || process.cwd();
    const outDir = this.options.out || path.join(projectPath, 'dist');

    console.log(`[CLI] Compiling project at: ${projectPath}`);
    const pipeline = new PipelineEngine();
    await pipeline.build(projectPath, outDir);

    const duration = Date.now() - start;
    console.log(`[Benchmark] Build pipeline completed in ${duration}ms`);
    return { success: true, message: `Build output successfully written to: ${outDir}` };
  }

  validate(args = [], options = {}) {
    const errors = [];
    if (args.length === 0) {
      errors.push('Project directory path argument is required.');
    }
    return { isValid: errors.length === 0, errors };
  }
}
