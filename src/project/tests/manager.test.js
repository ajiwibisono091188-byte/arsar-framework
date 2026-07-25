import assert from 'assert';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { ProjectManager } from '../core/project-manager.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const tempTestPath = path.join(__dirname, 'temp_test_project');

console.log('--- Running Project Manager Unit Tests ---');

const manager = new ProjectManager();

// Cleanup past test garbage if any
if (fs.existsSync(tempTestPath)) {
  fs.rmSync(tempTestPath, { recursive: true, force: true });
}

// Test 1: Create project
const projectId = manager.create(
  'Test Project',
  'test-project',
  'Description of test',
  tempTestPath
);

assert.ok(projectId, 'Project ID should be returned upon creation.');
assert.ok(manager.activeProjects.has(projectId), 'Created project should be registered in memory.');
console.log('✔ Test 1: Project creation passed.');

// Test 2: List open projects
const list = manager.list();
assert.strictEqual(list.length, 1, 'Active projects list count should be 1.');
assert.strictEqual(list[0].name, 'Test Project');
console.log('✔ Test 2: Project listing passed.');

// Test 3: Rename project
manager.rename(projectId, 'Renamed Title');
const activeObj = manager.activeProjects.get(projectId);
assert.strictEqual(activeObj.model.name, 'Renamed Title');
assert.strictEqual(activeObj.model.slug, 'renamed-title');
console.log('✔ Test 3: Project renaming passed.');

// Test 4: Close project
manager.close(projectId);
assert.ok(!manager.activeProjects.has(projectId), 'Closed project should be removed from memory.');
console.log('✔ Test 4: Project closing passed.');

// Clean up
if (fs.existsSync(tempTestPath)) {
  fs.rmSync(tempTestPath, { recursive: true, force: true });
}

console.log('🎉 PROJECT MANAGER TESTS COMPLETED SUCCESSFUL!\n');
