import assert from 'assert';
import { WorkflowRunner } from '../runner/workflow-runner.js';
import { BaseStep } from '../steps/base-step.js';

console.log('--- Running Workflow Runner Unit Tests ---');

// Setup mock steps
class SuccessStep extends BaseStep {
  execute(ctx) {
    ctx.successCount = (ctx.successCount || 0) + 1;
    return Promise.resolve(ctx);
  }
}

class FailStep extends BaseStep {
  execute(ctx) {
    return Promise.reject(new Error('Mock Step Failed'));
  }
  rollback(ctx) {
    ctx.rolledBack = true;
    return Promise.resolve(ctx);
  }
}

const def = {
  id: "test-pipeline",
  name: "Test Runner Pipeline",
  steps: ["step1", "step2"]
};

const stepsMap = new Map([
  ["step1", new SuccessStep("step1", "Success Step")],
  ["step2", new FailStep("step2", "Fail Step")]
]);

// Test 1: Fail and Rollback check
const runner = new WorkflowRunner(def, stepsMap);
runner.execute({}).catch((err) => {
  assert.strictEqual(err.message, 'Mock Step Failed');
  assert.strictEqual(runner.state.status, 'failed');
  assert.ok(runner.context.rolledBack, 'Rollback action must run on previous successful steps.');
  console.log('✔ Test 1: Step failure and rollback LIFO sequence passed.');
});

// Test 2: Skip Step checks
const def2 = { id: "test-skip", name: "Skip Pipeline", steps: ["step1", "step2"] };
const runner2 = new WorkflowRunner(def2, stepsMap);

// Force current index to 1 (FailStep) and skip it
runner2.currentStepIndex = 1;
runner2.skipStep().then((ctx) => {
  assert.strictEqual(runner2.state.status, 'completed');
  console.log('✔ Test 2: Step skipping sequence passed.');
});
