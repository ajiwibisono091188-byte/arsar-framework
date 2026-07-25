import assert from 'assert';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { AssetPipeline } from '../assets/asset-pipeline.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const tempAssetOut = path.join(__dirname, 'temp_asset_out');

console.log('--- Running Asset Pipeline Unit Tests ---');

// Clean
if (fs.existsSync(tempAssetOut)) {
  fs.rmSync(tempAssetOut, { recursive: true, force: true });
}

fs.mkdirSync(tempAssetOut);

// 1. Process assets
const projectData = {
  company: { name: "Test Corp" },
  brand: { primaryColor: "#990000", secondaryColor: "#009900" }
};

AssetPipeline.process(tempAssetOut, projectData);

// 2. Verify files exist
assert.ok(fs.existsSync(path.join(tempAssetOut, 'assets/css/style.css')));
assert.ok(fs.existsSync(path.join(tempAssetOut, 'assets/js/main.js')));
assert.ok(fs.existsSync(path.join(tempAssetOut, 'manifest.json')));

// 3. Verify CSS properties inject
const css = fs.readFileSync(path.join(tempAssetOut, 'assets/css/style.css'), 'utf8');
assert.ok(css.includes('--primary-color: #990000'));
assert.ok(css.includes('--secondary-color: #009900'));

// 4. Verify manifest content
const manifest = JSON.parse(fs.readFileSync(path.join(tempAssetOut, 'manifest.json'), 'utf8'));
assert.strictEqual(manifest.name, 'Test Corp');
assert.strictEqual(manifest.theme_color, '#990000');

console.log('✔ Test 1: Asset compiler ran and verified successfully.');

// Clean
if (fs.existsSync(tempAssetOut)) {
  fs.rmSync(tempAssetOut, { recursive: true, force: true });
}

console.log('🎉 ASSET PIPELINE TESTS COMPLETED SUCCESSFUL!\n');
