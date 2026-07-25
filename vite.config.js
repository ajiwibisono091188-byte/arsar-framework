import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { resolve, join } from 'path';
import { readdirSync, statSync } from 'fs';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const srcDir = resolve(__dirname, 'src');

// Recursive helper to get all HTML files as entry points for Rollup
function getHtmlEntries(dir, baseDir = dir) {
  let entries = {};
  try {
    const files = readdirSync(dir);
    for (const file of files) {
      const fullPath = join(dir, file);
      const relativePath = join(dir, file).replace(baseDir, '').replace(/^[\\/]/, '');
      
      // Skip build and public directories to prevent loops
      if (statSync(fullPath).isDirectory()) {
        if (file !== 'dist' && file !== 'public' && file !== 'node_modules') {
          Object.assign(entries, getHtmlEntries(fullPath, baseDir));
        }
      } else if (file.endsWith('.html')) {
        const entryKey = relativePath.replace(/\.html$/, '').replace(/\\/g, '/');
        // If it's the root index.html, call it 'main', otherwise use relative path
        entries[entryKey || 'main'] = resolve(fullPath);
      }
    }
  } catch (e) {
    // If directory doesn't exist yet, return empty
  }
  return entries;
}

export default defineConfig({
  root: srcDir,
  plugins: [
    tailwindcss(),
  ],
  build: {
    outDir: resolve(srcDir, 'dist'),
    emptyOutDir: true,
    rollupOptions: {
      input: getHtmlEntries(srcDir),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
