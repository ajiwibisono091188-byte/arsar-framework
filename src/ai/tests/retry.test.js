import assert from 'assert';
import { RetryManager } from '../retry/retry-manager.js';

console.log('--- Running Retry Manager Unit Tests ---');

// Test 1: Immediate success
let calls = 0;
const taskSuccess = async () => {
  calls++;
  return 'success_payload';
};

RetryManager.execute(taskSuccess, 3, 10).then((res) => {
  assert.strictEqual(res, 'success_payload');
  assert.strictEqual(calls, 1, 'Should resolve immediately on first call.');
  console.log('✔ Test 1: Immediate execution passed.');
});

// Test 2: Success after failure attempts
let failAttempts = 0;
const taskFailRetry = async () => {
  failAttempts++;
  if (failAttempts < 3) {
    throw new Error('Temporary failure');
  }
  return 'eventual_success';
};

RetryManager.execute(taskFailRetry, 4, 10).then((res) => {
  assert.strictEqual(res, 'eventual_success');
  assert.strictEqual(failAttempts, 3, 'Should succeed on the third attempt.');
  console.log('✔ Test 2: Multi-attempt recovery passed.');
});

// Test 3: Total exhaustion failure
const taskAlwaysFail = async () => {
  throw new Error('Fatal database crash');
};

RetryManager.execute(taskAlwaysFail, 2, 5).catch((err) => {
  assert.ok(err.message.includes('failed after 2 attempts'), 'Should throw exhaustion message.');
  console.log('✔ Test 3: Exhaustion fatal failure passed.');
  console.log('🎉 RETRY MANAGER TESTS COMPLETED SUCCESSFUL!\n');
});
