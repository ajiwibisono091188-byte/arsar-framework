import assert from 'assert';
import { AIEngine } from '../engine/ai-engine.js';
import { OpenAIProvider } from '../providers/openai-provider.js';
import { GeminiProvider } from '../providers/gemini-provider.js';

console.log('--- Running AI Engine Unit Tests ---');

const engine = new AIEngine();
const openai = new OpenAIProvider();
const gemini = new GeminiProvider();

// Test 1: Register providers
engine.registerProvider('openai', openai);
engine.registerProvider('gemini', gemini);
assert.strictEqual(engine.providers.size, 2);
console.log('✔ Test 1: Provider registration passed.');

// Test 2: Set default provider
engine.setDefaultProvider('gemini');
assert.strictEqual(engine.defaultProvider.name, 'Gemini');
console.log('✔ Test 2: Active provider selection passed.');

// Test 3: Generate text (routes to Gemini)
engine.generate('hello hero prompt').then((result) => {
  assert.ok(result.text.includes('GEMINI ENGINE'), 'Output should come from Gemini.');
  console.log('✔ Test 3: Active provider routing passed.');
});

// Test 4: Batch generation
engine.generateBatch(['hero prompt 1', 'hero prompt 2']).then((results) => {
  assert.strictEqual(results.length, 2);
  assert.ok(results[0].success);
  console.log('✔ Test 4: Batch queue execution passed.');
});
