import assert from 'assert';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { ProjectFactory } from '../../project/core/project-factory.js';
import { PipelineEngine } from '../engine/pipeline-engine.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const tempProjPath = path.join(__dirname, 'temp_e2e_project');
const tempDistPath = path.join(__dirname, 'temp_e2e_dist');

console.log('--- Running Pipeline Engine E2E Unit Tests ---');

const engine = new PipelineEngine();

// Clean remnants
if (fs.existsSync(tempProjPath)) fs.rmSync(tempProjPath, { recursive: true, force: true });
if (fs.existsSync(tempDistPath)) fs.rmSync(tempDistPath, { recursive: true, force: true });

// 1. Setup mock project config files
ProjectFactory.create('E2E YogaDAI', 'e2e-yogadai', 'E2E test project description', tempProjPath);

// 2. Run E2E build
engine.build(tempProjPath, tempDistPath).then((success) => {
  assert.ok(success);

  // 3. Verify output files
  const validation = engine.validate(tempDistPath);
  assert.ok(validation.isValid, `Missing files in build output: ${validation.missing.join(', ')}`);

  // Read index.html content
  const html = fs.readFileSync(path.join(tempDistPath, 'index.html'), 'utf8');
  assert.ok(html.includes('PT Arsar Digital Indonesia'), 'Company name legal description should be rendered.');
  assert.ok(html.includes('application/ld+json'), 'Schema JSON-LD metadata should be injected in head.');
  assert.ok(html.includes('style.css'), 'CSS stylesheet should be included.');
  console.log('✔ Test 1: Full E2E build pipeline resolved and verified successfully.');

  // Clean up
  if (fs.existsSync(tempProjPath)) fs.rmSync(tempProjPath, { recursive: true, force: true });
  if (fs.existsSync(tempDistPath)) fs.rmSync(tempDistPath, { recursive: true, force: true });
});
