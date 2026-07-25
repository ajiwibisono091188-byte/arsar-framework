import assert from 'assert';
import { WorkflowState } from '../state/workflow-state.js';

console.log('--- Running Workflow State Unit Tests ---');

const state = new WorkflowState('mock-id');
assert.strictEqual(state.status, 'pending');

// 1. Trigger Start
state.start();
assert.strictEqual(state.status, 'running');
assert.ok(state.startedAt);

// 2. Trigger Pause
state.pause();
assert.strictEqual(state.status, 'paused');

// 3. Trigger Resume
state.resume();
assert.strictEqual(state.status, 'running');

// 4. Update progress
state.completedSteps.push('step1');
state.updateProgress(2); // 1 out of 2 completed
assert.strictEqual(state.progress, 50);

// 5. Trigger Complete
state.complete();
assert.strictEqual(state.status, 'completed');
assert.strictEqual(state.progress, 100);
assert.ok(state.finishedAt);
console.log('✔ Test 1: State machine transitions and timestamps checks passed.');

console.log('🎉 WORKFLOW STATE TESTS COMPLETED SUCCESSFUL!\n');
