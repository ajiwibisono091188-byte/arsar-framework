/**
 * ProjectModel Class
 */
export class ProjectModel {
  constructor(data = {}) {
    this.id = data.id || '';
    this.name = data.name || 'Proyek Baru';
    this.slug = data.slug || 'proyek-baru';
    this.description = data.description || '';
    this.createdAt = data.createdAt || new Date().toISOString();
    this.updatedAt = data.updatedAt || new Date().toISOString();
    this.version = data.version || '1.0.0'; // Version of this project data schema
    this.frameworkVersion = data.frameworkVersion || '2.0.0'; // Version of the framework used
  }

  /**
   * Convert model to plain JSON object
   * @returns {Object}
   */
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      slug: this.slug,
      description: this.description,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      version: this.version,
      frameworkVersion: this.frameworkVersion
    };
  }
}
