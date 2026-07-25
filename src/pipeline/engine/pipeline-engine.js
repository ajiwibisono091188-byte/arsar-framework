import fs from 'fs';
import path from 'path';
import { ProjectLoader } from '../../project/storage/project-loader.js';
import { ExperienceComposer } from '../../composer/engine/experience-composer.js';
import { Renderer } from '../renderer/renderer.js';
import { SEOOutputGenerator } from '../seo/seo-output-generator.js';
import { AssetPipeline } from '../assets/asset-pipeline.js';

/**
 * PipelineEngine Class
 */
export class PipelineEngine {
  /**
   * @param {Object} eventBus Optional EventBus for hooks
   */
  constructor(eventBus = null) {
    this.eventBus = eventBus;
    this.isBuilding = false;
    this.composer = new ExperienceComposer(eventBus);
  }

  /**
   * Helper to emit event signals
   */
  emit(event, ...args) {
    if (this.eventBus) {
      this.eventBus.emit(event, ...args);
    } else {
      console.log(`[Pipeline Engine Event] ${event}:`, ...args);
    }
  }

  /**
   * Run E2E build pipeline
   * @param {String} projectPath Path containing company.json, brand.json, etc.
   * @param {String} outDir Path to export dist files
   * @returns {Promise<Boolean>} True if success
   */
  async build(projectPath, outDir) {
    this.isBuilding = true;
    this.emit('build.started', projectPath);

    try {
      // 1. Clean previous build files
      this.clean(outDir);

      if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir, { recursive: true });
      }

      // 2. Load configurations from Project Engine
      const { model, configs } = ProjectLoader.load(projectPath);

      // 3. Compose Page Blueprint using Experience Composer
      const blueprint = this.composer.compose(
        {
          goal: configs.landing.faqBlockEnabled ? "Lead Generation" : "SEO",
          pageType: "landing",
          title: configs.seo.defaultTitle
        },
        {
          industry: "Automotive Financing"
        }
      );

      // 4. Render HTML static page
      this.emit('render.started');
      let html = Renderer.render(blueprint, configs);
      this.emit('render.completed');

      // 5. Generate SEO files and JSON-LD script block
      const ldJsonTag = SEOOutputGenerator.generate(outDir, configs);
      
      // Inject LD-JSON tag into head block of index.html
      html = html.replace('<!-- INCLUDE_JSON_LD -->', ldJsonTag);

      // Write compiled HTML
      fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf8');

      // 6. Compile Assets and Manifest
      AssetPipeline.process(outDir, configs);

      this.isBuilding = false;
      this.emit('output.generated', outDir);
      this.emit('build.completed', outDir);
      return true;
    } catch (err) {
      this.isBuilding = false;
      console.error('[Pipeline Engine Error] E2E build failed:', err.message);
      throw err;
    }
  }

  /**
   * Delete outDir static folder
   */
  clean(outDir) {
    if (fs.existsSync(outDir)) {
      fs.rmSync(outDir, { recursive: true, force: true });
      console.log(`[Pipeline Engine] Cleaned folder: ${outDir}`);
    }
  }

  /**
   * Mock watch command
   */
  watch(projectPath) {
    console.log(`[Pipeline Engine] Watching changes at: ${projectPath}...`);
  }

  /**
   * Validate that all built files exist
   */
  validate(outDir) {
    const required = [
      'index.html',
      'robots.txt',
      'sitemap.xml',
      'manifest.json',
      'assets/css/style.css',
      'assets/js/main.js'
    ];

    const missing = [];
    required.forEach((file) => {
      const p = path.join(outDir, file);
      if (!fs.existsSync(p)) {
        missing.push(file);
      }
    });

    return {
      isValid: missing.length === 0,
      missing
    };
  }

  status() {
    return this.isBuilding ? 'building' : 'idle';
  }
}
