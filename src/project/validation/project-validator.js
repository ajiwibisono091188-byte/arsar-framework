import fs from 'fs';
import path from 'path';

/**
 * ProjectValidator Class
 */
export class ProjectValidator {
  /**
   * Validate a project folder structure and configuration integrity
   * @param {String} basePath 
   * @returns {Object} { isValid: boolean, errors: Array }
   */
  static validate(basePath) {
    const errors = [];

    if (!fs.existsSync(basePath)) {
      errors.push(`Project path does not exist: ${basePath}`);
      return { isValid: false, errors };
    }

    // 1. Check project.json existence and validity
    const projectJsonPath = path.join(basePath, 'project.json');
    if (!fs.existsSync(projectJsonPath)) {
      errors.push('Required file "project.json" is missing.');
    } else {
      try {
        const meta = JSON.parse(fs.readFileSync(projectJsonPath, 'utf8'));
        
        // Validate project name
        if (!meta.name || meta.name.trim() === '') {
          errors.push('Project name cannot be empty.');
        }

        // Validate slug (must be lowercase alphanumeric + hyphens)
        const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
        if (!meta.slug || !slugRegex.test(meta.slug)) {
          errors.push(`Invalid project slug format: "${meta.slug}". Must be kebab-case (lowercase, alphanumeric, and hyphens only).`);
        }

        // Validate version info
        if (!meta.version) {
          errors.push('Project version is missing.');
        }
      } catch (err) {
        errors.push(`Failed to parse project.json: ${err.message}`);
      }
    }

    // 2. Check 6 other required JSON files
    const requiredFiles = ['company.json', 'brand.json', 'landing.json', 'seo.json', 'ads.json', 'deploy.json'];
    requiredFiles.forEach((file) => {
      const filePath = path.join(basePath, file);
      if (!fs.existsSync(filePath)) {
        errors.push(`Required configuration file "${file}" is missing.`);
      }
    });

    // 3. Check 3 required folders
    const requiredDirs = ['assets', 'output', 'logs'];
    requiredDirs.forEach((dir) => {
      const dirPath = path.join(basePath, dir);
      if (!fs.existsSync(dirPath) || !fs.statSync(dirPath).isDirectory()) {
        errors.push(`Required subdirectory "${dir}/" is missing.`);
      }
    });

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}
