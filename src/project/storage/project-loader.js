import fs from 'fs';
import path from 'path';
import { ProjectModel } from '../models/project-model.js';

/**
 * ProjectLoader Class
 */
export class ProjectLoader {
  /**
   * Load project files from disk path
   * @param {String} basePath 
   * @returns {Object} { model: ProjectModel, configs: Object }
   */
  static load(basePath) {
    const projectJsonPath = path.join(basePath, 'project.json');
    if (!fs.existsSync(projectJsonPath)) {
      throw new Error(`[Project Loader Error] project.json not found at ${basePath}`);
    }

    try {
      // 1. Read project meta info
      const meta = JSON.parse(fs.readFileSync(projectJsonPath, 'utf8'));
      const model = new ProjectModel(meta);

      // 2. Read other configuration files
      const configs = {};
      const configFiles = ['company', 'brand', 'landing', 'seo', 'ads', 'deploy'];

      configFiles.forEach((file) => {
        const filePath = path.join(basePath, `${file}.json`);
        if (fs.existsSync(filePath)) {
          configs[file] = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        } else {
          configs[file] = {};
        }
      });

      console.log(`[Project Loader] Successfully loaded project from: ${basePath}`);
      return { model, configs };
    } catch (error) {
      throw new Error(`[Project Loader Error] Failed to parse project configuration: ${error.message}`);
    }
  }
}
