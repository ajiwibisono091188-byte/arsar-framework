import fs from 'fs';
import path from 'path';

/**
 * ProjectSaver Class
 */
export class ProjectSaver {
  /**
   * Save project configs and meta model back to disk
   * @param {String} basePath Target project path
   * @param {ProjectModel} model Project meta model
   * @param {Object} configs Dictionary of other JSON configuration files
   */
  static save(basePath, model, configs) {
    if (!fs.existsSync(basePath)) {
      throw new Error(`[Project Saver Error] Destination path does not exist: ${basePath}`);
    }

    try {
      // 1. Update updatedAt timestamp
      model.updatedAt = new Date().toISOString();

      // 2. Write project.json
      fs.writeFileSync(
        path.join(basePath, 'project.json'),
        JSON.stringify(model.toJSON(), null, 2),
        'utf8'
      );

      // 3. Write other configs
      Object.keys(configs).forEach((key) => {
        const filePath = path.join(basePath, `${key}.json`);
        fs.writeFileSync(
          filePath,
          JSON.stringify(configs[key], null, 2),
          'utf8'
        );
      });

      console.log(`[Project Saver] Project saved successfully at: ${basePath}`);
    } catch (error) {
      throw new Error(`[Project Saver Error] Failed to write project data to disk: ${error.message}`);
    }
  }
}
