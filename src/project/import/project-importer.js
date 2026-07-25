import fs from 'fs';
import path from 'path';
import { ProjectValidator } from '../validation/project-validator.js';
import { ProjectLoader } from '../storage/project-loader.js';

/**
 * ProjectImporter Class
 */
export class ProjectImporter {
  /**
   * Import project from source folder to target workspace
   * @param {String} sourcePath Source directory containing project.json, etc.
   * @param {String} targetPath Destination directory in workspace
   * @returns {Object} { model, configs }
   */
  static importFromFolder(sourcePath, targetPath) {
    console.log(`[Project Importer] Importing project from: ${sourcePath} to ${targetPath}`);

    // 1. Verify source directory validity before copying
    const validation = ProjectValidator.validate(sourcePath);
    if (!validation.isValid) {
      throw new Error(`[Project Importer Error] Source project is invalid: ${validation.errors.join(', ')}`);
    }

    // 2. Ensure target directory exists
    if (!fs.existsSync(targetPath)) {
      fs.mkdirSync(targetPath, { recursive: true });
    }

    // 3. Copy files (recursive implementation)
    const filesToCopy = [
      'project.json', 'company.json', 'brand.json', 'landing.json',
      'seo.json', 'ads.json', 'deploy.json'
    ];

    filesToCopy.forEach((file) => {
      fs.copyFileSync(
        path.join(sourcePath, file),
        path.join(targetPath, file)
      );
    });

    // Create required empty directories
    const requiredDirs = ['assets', 'output', 'logs'];
    requiredDirs.forEach((dir) => {
      const dirPath = path.join(targetPath, dir);
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }
    });

    console.log(`[Project Importer] Import successfully completed. Resolving configurations...`);
    return ProjectLoader.load(targetPath);
  }
}
