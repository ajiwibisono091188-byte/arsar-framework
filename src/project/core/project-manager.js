import fs from 'fs';
import path from 'path';
import { ProjectFactory } from './project-factory.js';
import { ProjectLoader } from '../storage/project-loader.js';
import { ProjectSaver } from '../storage/project-saver.js';
import { ProjectValidator } from '../validation/project-validator.js';

/**
 * ProjectManager Class
 */
export class ProjectManager {
  /**
   * @param {Object} eventBus Optional EventBus instance for signals
   */
  constructor(eventBus = null) {
    this.activeProjects = new Map(); // Map of projectId -> { model, configs, path }
    this.eventBus = eventBus;
  }

  /**
   * Helper to emit event signals
   */
  emit(event, ...args) {
    if (this.eventBus) {
      this.eventBus.emit(event, ...args);
    } else {
      console.log(`[Project Manager Event] ${event}:`, ...args);
    }
  }

  /**
   * Create a new project on disk and load it in memory
   */
  create(name, slug, description, basePath) {
    const model = ProjectFactory.create(name, slug, description, basePath);
    const loaded = ProjectLoader.load(basePath);
    
    const projectData = {
      model: loaded.model,
      configs: loaded.configs,
      path: basePath
    };

    this.activeProjects.set(loaded.model.id, projectData);
    this.emit('project.created', loaded.model.id, basePath);
    return loaded.model.id;
  }

  /**
   * Open a project from path and register to memory map
   */
  open(basePath) {
    const validation = ProjectValidator.validate(basePath);
    if (!validation.isValid) {
      throw new Error(`[Project Manager Error] Project is invalid: ${validation.errors.join(', ')}`);
    }

    const { model, configs } = ProjectLoader.load(basePath);
    
    // Check if already open
    if (this.activeProjects.has(model.id)) {
      return model.id;
    }

    const projectData = {
      model,
      configs,
      path: basePath
    };

    this.activeProjects.set(model.id, projectData);
    this.emit('project.opened', model.id, basePath);
    return model.id;
  }

  /**
   * Save an open project by ID
   */
  save(projectId) {
    const project = this.activeProjects.get(projectId);
    if (!project) {
      throw new Error(`[Project Manager Error] Project "${projectId}" is not open.`);
    }

    ProjectSaver.save(project.path, project.model, project.configs);
    this.emit('project.saved', projectId);
  }

  /**
   * Close a project removing it from memory map
   */
  close(projectId) {
    if (this.activeProjects.has(projectId)) {
      this.activeProjects.delete(projectId);
      this.emit('project.closed', projectId);
    }
  }

  /**
   * Delete project files from disk and memory
   */
  delete(projectId) {
    const project = this.activeProjects.get(projectId);
    if (!project) return;

    this.close(projectId);

    // Delete folder (recursive)
    if (fs.existsSync(project.path)) {
      fs.rmSync(project.path, { recursive: true, force: true });
    }
    this.emit('project.deleted', projectId);
  }

  /**
   * List all open project IDs
   */
  list() {
    return Array.from(this.activeProjects.keys()).map((id) => {
      const proj = this.activeProjects.get(id);
      return {
        id,
        name: proj.model.name,
        slug: proj.model.slug,
        path: proj.path
      };
    });
  }

  /**
   * Rename an open project
   */
  rename(projectId, newName) {
    const project = this.activeProjects.get(projectId);
    if (!project) return;

    project.model.name = newName;
    // Generate new slug
    project.model.slug = newName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    this.save(projectId);
  }

  /**
   * Duplicate an open project to a new path
   */
  duplicate(projectId, newPath) {
    const project = this.activeProjects.get(projectId);
    if (!project) {
      throw new Error(`[Project Manager Error] Project "${projectId}" is not open.`);
    }

    // Save current changes first
    this.save(projectId);

    // Create duplicate at newPath
    const newModel = ProjectFactory.create(
      project.model.name + ' Copy',
      project.model.slug + '-copy',
      project.model.description,
      newPath
    );

    // Copy current configuration settings to the duplicate path
    const copiedConfigs = JSON.parse(JSON.stringify(project.configs));
    ProjectSaver.save(newPath, newModel, copiedConfigs);

    console.log(`[Project Manager] Duplicated project "${projectId}" to: ${newPath}`);
    return this.open(newPath);
  }
}
