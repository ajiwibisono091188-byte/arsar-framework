import fs from 'fs';
import path from 'path';

/**
 * AssetPipeline Class
 */
export class AssetPipeline {
  /**
   * Run asset compiler and write folders to outDir
   * @param {String} outDir Target output directory
   * @param {Object} projectData Config data dictionary (brand, company, etc.)
   */
  static process(outDir, projectData = {}) {
    console.log('[Asset Pipeline] Processing styles and compilation manifests...');

    const brand = projectData.brand || { primaryColor: '#8b5cf6', secondaryColor: '#10b981' };

    // 1. Create asset directories
    const cssDir = path.join(outDir, 'assets/css');
    const jsDir = path.join(outDir, 'assets/js');
    const imgDir = path.join(outDir, 'assets/images');

    [cssDir, jsDir, imgDir].forEach((dir) => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });

    // 2. Compile CSS styles (injecting visual branding HEX tokens)
    const cssContent = `:root {
  --primary-color: ${brand.primaryColor || '#8b5cf6'};
  --secondary-color: ${brand.secondaryColor || '#10b981'};
  --border-radius: 8px;
}
body {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}
`;
    fs.writeFileSync(path.join(cssDir, 'style.css'), cssContent, 'utf8');

    // 3. Write JS scripts
    const jsContent = `console.log('[ARSAR Engine] Page loaded successfully.');`;
    fs.writeFileSync(path.join(jsDir, 'main.js'), jsContent, 'utf8');

    // 4. Write manifest.json
    const manifest = {
      name: projectData.company?.name || "ARSAR Web App",
      short_name: "ARSAR",
      start_url: "/",
      display: "standalone",
      background_color: "#ffffff",
      theme_color: brand.primaryColor || '#8b5cf6',
      assets: {
        css: ["assets/css/style.css"],
        js: ["assets/js/main.js"]
      }
    };
    fs.writeFileSync(path.join(outDir, 'manifest.json'), JSON.stringify(manifest, null, 2), 'utf8');

    console.log('[Asset Pipeline] Asset compiling finished.');
  }
}
