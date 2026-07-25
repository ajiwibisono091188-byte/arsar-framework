import assert from 'assert';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { ProjectFactory } from '../core/project-factory.js';
import { ProjectLoader } from '../storage/project-loader.js';
import { ProjectSaver } from '../storage/project-saver.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const tempLoaderPath = path.join(__dirname, 'temp_loader_project');

console.log('--- Running Project Loader & Saver Unit Tests ---');

// Cleanup
if (fs.existsSync(tempLoaderPath)) {
  fs.rmSync(tempLoaderPath, { recursive: true, force: true });
}

// 1. Create a dummy project structure
const model = ProjectFactory.create(
  'Loader Test',
  'loader-test',
  'Loading test desc',
  tempLoaderPath
);

// 2. Test Loader
const loaded = ProjectLoader.load(tempLoaderPath);
assert.strictEqual(loaded.model.name, 'Loader Test', 'Loaded project name should match.');
assert.strictEqual(loaded.configs.company.name, 'Arsar Digital', 'Loaded default company name should match.');
console.log('✔ Test 1: Project loader parsed files successfully.');

// 3. Test Saver
loaded.configs.company.name = 'Updated Company Name';
ProjectSaver.save(tempLoaderPath, loaded.model, loaded.configs);

// Reload to verify saved changes
const reloaded = ProjectLoader.load(tempLoaderPath);
assert.strictEqual(reloaded.configs.company.name, 'Updated Company Name', 'Saved config modification should persist.');
console.log('✔ Test 2: Project saver updated config file successfully.');

// Clean up
if (fs.existsSync(tempLoaderPath)) {
  fs.rmSync(tempLoaderPath, { recursive: true, force: true });
}

console.log('🎉 LOADER & SAVER TESTS COMPLETED SUCCESSFUL!\n');
