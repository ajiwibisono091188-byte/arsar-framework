import assert from 'assert';
import { WorkflowValidator } from '../validation/workflow-validator.js';

console.log('--- Running Workflow Validator Unit Tests ---');

// Test 1: Clean definition without dependencies
const cleanDef = {
  id: "clean-wf",
  name: "Clean Workflow",
  steps: ["step1", "step2"]
};

const resultClean = WorkflowValidator.validate(cleanDef);
assert.ok(resultClean.isValid, 'Clean workflow definition should pass validation.');
console.log('✔ Test 1: Clean definition checked.');

// Test 2: Circular dependency graph (A depends on B, B depends on A)
const circularGraph = {
  stepA: ["stepB"],
  stepB: ["stepA"]
};

const badDef = {
  id: "bad-wf",
  name: "Circular Loop Workflow",
  steps: ["stepA", "stepB"],
  dependencies: circularGraph
};

const resultBad = WorkflowValidator.validate(badDef);
assert.ok(!resultBad.isValid);
assert.ok(resultBad.errors.some(err => err.includes('Circular dependency')));
console.log('✔ Test 2: Circular dependency loop detected successfully.');

// Test 3: Complex nested circular dependency graph (A -> B -> C -> A)
const complexCircularGraph = {
  stepA: ["stepB"],
  stepB: ["stepC"],
  stepC: ["stepA"]
};
const badDefComplex = {
  id: "bad-wf-complex",
  name: "Complex Circular Loop",
  steps: ["stepA", "stepB", "stepC"],
  dependencies: complexCircularGraph
};
const resultBadComplex = WorkflowValidator.validate(badDefComplex);
assert.ok(!resultBadComplex.isValid);
console.log('✔ Test 3: Complex circular dependency loop detected successfully.');

console.log('🎉 WORKFLOW VALIDATOR TESTS COMPLETED SUCCESSFUL!\n');
