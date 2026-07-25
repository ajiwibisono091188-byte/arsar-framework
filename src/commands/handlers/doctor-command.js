import { BaseCommand } from '../core/base-command.js';
import fs from 'fs';
import path from 'path';

export class DoctorCommand extends BaseCommand {
  constructor() {
    super('doctor', 'Doctor Diagnose', 'Run health checks for ARSAR Framework.');
  }

  execute(context) {
    console.log('=== ARSAR Doctor Health Diagnoses ===');
    const errors = [];
    const root = process.cwd();

    // 1. Check required folders
    const dirs = ['src', 'docs', 'schema', 'examples'];
    dirs.forEach((dir) => {
      const p = path.join(root, dir);
      if (!fs.existsSync(p)) {
        errors.push(`Folder "${dir}" is missing in root workspace.`);
      }
    });

    // 2. Check workflow registration
    try {
      const testWorkflowPath = path.join(root, 'src/workflow/definitions/definitions.js');
      if (!fs.existsSync(testWorkflowPath)) {
        errors.push('Workflow definitions file definitions.js is missing.');
      }
    } catch (e) {
      errors.push(`Workflow validation check failed: ${e.message}`);
    }

    // 3. Asset pipeline files
    const assetPath = path.join(root, 'src/pipeline/assets/asset-pipeline.js');
    if (!fs.existsSync(assetPath)) {
      errors.push('Asset Pipeline module file is missing.');
    }

    if (errors.length > 0) {
      console.log('❌ Diagnostic failed. Missing parameters found:');
      errors.forEach(err => console.log(`  - ${err}`));
      console.log('\nSteps to repair: Re-install the arsar-framework packages or verify folder roots.');
      return Promise.resolve({ success: false, errors });
    }

    console.log('✅ All health diagnostics checks passed! Ready for Release 0.1.');
    return Promise.resolve({ success: true, message: 'All checks passed.' });
  }
}
