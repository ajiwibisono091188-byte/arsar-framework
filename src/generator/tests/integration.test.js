import assert from 'assert';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Import all previous modules
import { ServiceContainer } from '../../runtime/container/service-container.js';
import { EventBus } from '../../runtime/events/event-bus.js';
import { ProjectManager } from '../../project/core/project-manager.js';
import { ProjectFactory } from '../../project/core/project-factory.js';
import { KnowledgeEngine } from '../../knowledge/engine/knowledge-engine.js';
import { AIEngine } from '../../ai/engine/ai-engine.js';
import { GeminiProvider } from '../../ai/providers/gemini-provider.js';
import { PipelineEngine } from '../../pipeline/engine/pipeline-engine.js';
import { LandingGenerator } from '../engine/landing-generator.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const tempProj = path.join(__dirname, 'temp_integration_project');
const tempOut = path.join(__dirname, 'temp_integration_output');

console.log('--- Running Landing Generator Integration E2E Tests ---');

// Cleanup
if (fs.existsSync(tempProj)) fs.rmSync(tempProj, { recursive: true, force: true });
if (fs.existsSync(tempOut)) fs.rmSync(tempOut, { recursive: true, force: true });

// 1. Setup Service Container and bind E2E engines
const container = new ServiceContainer();
const events = new EventBus();

container.singleton('events', events);
container.singleton('project-manager', new ProjectManager(events));
container.singleton('knowledge-engine', new KnowledgeEngine(events));

// Setup AI engine
const ai = new AIEngine(events);
ai.registerProvider('gemini', new GeminiProvider());
container.singleton('ai-engine', ai);

// Setup compile pipeline
container.singleton('pipeline-engine', new PipelineEngine(events));

// 2. Create target mock project variables
ProjectFactory.create('YogaDAI Integration', 'yogadai-integration', 'E2E test description', tempProj);

// 3. Instantiate LandingGenerator with Container
const generator = new LandingGenerator(container);

// Track progress events
let startedFired = false;
let progressVal = 0;
let completedFired = false;

events.on('generator.started', () => { startedFired = true; });
events.on('generator.progress', (val) => { progressVal = val; });
events.on('generator.completed', () => { completedFired = true; });

// 4. Trigger E2E generation
generator.generate(tempProj, tempOut).then((success) => {
  assert.ok(success);
  assert.ok(startedFired);
  assert.strictEqual(progressVal, 100);
  assert.ok(completedFired);

  // 5. Verify output files
  assert.ok(fs.existsSync(path.join(tempOut, 'index.html')));
  assert.ok(fs.existsSync(path.join(tempOut, 'robots.txt')));
  assert.ok(fs.existsSync(path.join(tempOut, 'sitemap.xml')));
  assert.ok(fs.existsSync(path.join(tempOut, 'manifest.json')));

  console.log('✔ Test 1: One Click Generate successfully ran and generated all target E2E static assets.');

  // Clean up
  if (fs.existsSync(tempProj)) fs.rmSync(tempProj, { recursive: true, force: true });
  if (fs.existsSync(tempOut)) fs.rmSync(tempOut, { recursive: true, force: true });
});
