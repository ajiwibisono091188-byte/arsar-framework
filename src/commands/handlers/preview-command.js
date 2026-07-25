import { BaseCommand } from '../core/base-command.js';
import fs from 'fs';
import path from 'path';

export class PreviewCommand extends BaseCommand {
  constructor() {
    super('preview', 'Preview Site', 'Verify visual output and mock preview server.');
  }

  execute(context) {
    const projectPath = this.args[0] || process.cwd();
    const outDir = this.options.out || path.join(projectPath, 'dist');
    const indexFile = path.join(outDir, 'index.html');

    if (!fs.existsSync(indexFile)) {
      throw new Error(`[Preview Error] index.html not found at: ${indexFile}. Run "build" or "generate" first.`);
    }

    console.log(`[CLI] Mocking preview server for: ${indexFile}`);
    console.log(`[Preview] Local server running at http://localhost:8080`);
    return Promise.resolve({ success: true, url: 'http://localhost:8080' });
  }

  validate(args = [], options = {}) {
    const errors = [];
    if (args.length === 0) {
      errors.push('Project directory path argument is required.');
    }
    return { isValid: errors.length === 0, errors };
  }
}
