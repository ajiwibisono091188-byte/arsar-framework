import assert from 'assert';
import { WorkflowEngine } from '../engine/workflow-engine.js';
import { workflowDefinitions } from '../definitions/definitions.js';

console.log('--- Running Workflow Engine Unit Tests ---');

const engine = new WorkflowEngine();

// Test 1: Register template
engine.registerWorkflow(workflowDefinitions['build-pipeline']);
assert.ok(engine.workflows.has('build-pipeline'));
console.log('✔ Test 1: Workflow registration passed.');

// Test 2: Run pipeline sekuensial E2E
const { runnerId, promise } = engine.run('build-pipeline', {});

promise.then((ctx) => {
  assert.strictEqual(engine.status(runnerId), 'completed');
  assert.strictEqual(ctx.project.name, 'YogaDAI', 'Project load step should populate company name.');
  assert.strictEqual(ctx.liveUrl, 'https://yogadai.pages.dev', 'Deployment step should populate live URL.');
  console.log('✔ Test 2: E2E build pipeline run loop resolved successfully.');
});
