import fs from 'fs';
import path from 'path';
import { ProjectModel } from '../models/project-model.js';

/**
 * ProjectFactory Class
 */
export class ProjectFactory {
  /**
   * Create a new project structure at the target path
   * @param {String} name 
   * @param {String} slug 
   * @param {String} description 
   * @param {String} basePath 
   * @returns {ProjectModel} Created project model instance
   */
  static create(name, slug, description, basePath) {
    if (!fs.existsSync(basePath)) {
      fs.mkdirSync(basePath, { recursive: true });
    }

    // 1. Create sub-folders
    const dirs = ['assets', 'output', 'logs'];
    dirs.forEach((dir) => {
      const dirPath = path.join(basePath, dir);
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }
    });

    // 2. Initialize project model
    const projectId = 'proj_' + Math.random().toString(36).substr(2, 9);
    const project = new ProjectModel({
      id: projectId,
      name,
      slug,
      description
    });

    // 3. Write default configurations
    fs.writeFileSync(path.join(basePath, 'project.json'), JSON.stringify(project.toJSON(), null, 2), 'utf8');
    fs.writeFileSync(path.join(basePath, 'company.json'), JSON.stringify(this.defaultCompany(), null, 2), 'utf8');
    fs.writeFileSync(path.join(basePath, 'brand.json'), JSON.stringify(this.defaultBrand(), null, 2), 'utf8');
    fs.writeFileSync(path.join(basePath, 'landing.json'), JSON.stringify(this.defaultLanding(), null, 2), 'utf8');
    fs.writeFileSync(path.join(basePath, 'seo.json'), JSON.stringify(this.defaultSeo(), null, 2), 'utf8');
    fs.writeFileSync(path.join(basePath, 'ads.json'), JSON.stringify(this.defaultAds(), null, 2), 'utf8');
    fs.writeFileSync(path.join(basePath, 'deploy.json'), JSON.stringify(this.defaultDeploy(), null, 2), 'utf8');

    console.log(`[Project Factory] Project structure initialized at: ${basePath}`);
    return project;
  }

  static defaultCompany() {
    return {
      name: "Arsar Digital",
      legalName: "PT Arsar Digital Indonesia",
      email: "hello@arsardigital.com",
      phone: "+6281234567890",
      address: {
        streetAddress: "Jl. Sunset Road 88",
        addressLocality: "Badung",
        postalCode: "80361"
      }
    };
  }

  static defaultBrand() {
    return {
      primaryColor: "#8b5cf6",
      secondaryColor: "#10b981",
      borderRadius: "md",
      fontFamily: "sans"
    };
  }

  static defaultLanding() {
    return {
      featuresBlockEnabled: true,
      testimonialsBlockEnabled: true,
      faqBlockEnabled: true,
      ctaBlockEnabled: true
    };
  }

  static defaultSeo() {
    return {
      defaultTitle: "ARSAR Marketing Web",
      defaultDescription: "Optimasi static website super cepat.",
      robots: "index, follow"
    };
  }

  static defaultAds() {
    return {
      utmTrackingEnabled: true,
      adCampaigns: []
    };
  }

  static defaultDeploy() {
    return {
      provider: "Cloudflare Pages",
      buildDir: "dist",
      cleanUrls: true
    };
  }
}
