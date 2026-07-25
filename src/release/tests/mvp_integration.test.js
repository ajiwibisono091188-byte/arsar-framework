import assert from 'assert';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { ProjectFactory } from '../../project/core/project-factory.js';
import { PipelineEngine } from '../../pipeline/engine/pipeline-engine.js';
import { LandingGenerator } from '../../generator/engine/landing-generator.js';
import { ServiceContainer } from '../../runtime/container/service-container.js';
import { EventBus } from '../../runtime/events/event-bus.js';
import { ProjectManager } from '../../project/core/project-manager.js';
import { KnowledgeEngine } from '../../knowledge/engine/knowledge-engine.js';
import { AIEngine } from '../../ai/engine/ai-engine.js';
import { GeminiProvider } from '../../ai/providers/gemini-provider.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const tempProjPath = path.join(__dirname, 'temp_integration_project');
const tempDistPath = path.join(__dirname, 'temp_integration_dist');

console.log('=== Running E2E MVP Release 0.1 Integration Tests ===');

// Clean previous remnants
if (fs.existsSync(tempProjPath)) fs.rmSync(tempProjPath, { recursive: true, force: true });
if (fs.existsSync(tempDistPath)) fs.rmSync(tempDistPath, { recursive: true, force: true });

// 1. Create project E2E
ProjectFactory.create('YogaDAI Release Test', 'yogadai-release-test', 'E2E release description', tempProjPath);
assert.ok(fs.existsSync(path.join(tempProjPath, 'project.json')));
assert.ok(fs.existsSync(path.join(tempProjPath, 'company.json')));
console.log('✔ Phase 1: Project creation E2E passed.');

// 2. Generate landing & build E2E using LandingGenerator
const container = new ServiceContainer();
const events = new EventBus();
container.singleton('events', events);
container.singleton('project-manager', new ProjectManager(events));
container.singleton('knowledge-engine', new KnowledgeEngine(events));
const ai = new AIEngine(events);
ai.registerProvider('gemini', new GeminiProvider());
container.singleton('ai-engine', ai);
container.singleton('pipeline-engine', new PipelineEngine(events));

const generator = new LandingGenerator(container);
generator.generate(tempProjPath, tempDistPath).then((success) => {
  assert.ok(success);

  // 3. Verify HTML output
  const htmlFile = path.join(tempDistPath, 'index.html');
  assert.ok(fs.existsSync(htmlFile));
  const htmlContent = fs.readFileSync(htmlFile, 'utf8');
  assert.ok(htmlContent.includes('PT Arsar Digital Indonesia'), 'HTML should contain default legal name.');
  assert.ok(htmlContent.includes('style.css'), 'HTML should link style.css.');
  console.log('✔ Phase 2: HTML compilation E2E passed.');

  // 4. Verify SEO
  assert.ok(fs.existsSync(path.join(tempDistPath, 'robots.txt')));
  assert.ok(fs.existsSync(path.join(tempDistPath, 'sitemap.xml')));
  assert.ok(htmlContent.includes('application/ld+json'), 'HTML should contain rich snippet metadata.');
  console.log('✔ Phase 3: SEO sitemaps compilation E2E passed.');

  // 5. Verify assets & manifest
  assert.ok(fs.existsSync(path.join(tempDistPath, 'assets/css/style.css')));
  assert.ok(fs.existsSync(path.join(tempDistPath, 'assets/js/main.js')));
  assert.ok(fs.existsSync(path.join(tempDistPath, 'manifest.json')));
  console.log('✔ Phase 4: CSS/JS assets and PWA manifest E2E passed.');

  // Cleanup
  if (fs.existsSync(tempProjPath)) fs.rmSync(tempProjPath, { recursive: true, force: true });
  if (fs.existsSync(tempDistPath)) fs.rmSync(tempDistPath, { recursive: true, force: true });

  console.log('🎉 ALL INTEGRATION TESTS PASSED SUCCESSFULLY!');
});
