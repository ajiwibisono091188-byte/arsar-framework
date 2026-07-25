import assert from 'assert';
import { HeadlineGenerator } from '../headlines/headline-generator.js';

console.log('--- Running Headlines Generator Unit Tests ---');

const input = {
  company: "YogaDAI",
  offer: "Kredit BPKB Mobil",
  location: "Surabaya",
  usp: "Bunga Paling Rendah"
};

const headlines = HeadlineGenerator.generate(input);

// Test 1: Check array size is exactly 30
assert.strictEqual(headlines.length, 30);
console.log('✔ Test 1: Generated headlines array size is exactly 30.');

// Test 2: Check length of each headline <= 30 chars
headlines.forEach((hl, i) => {
  assert.ok(hl.length <= 30, `Headline "${hl}" at index ${i} exceeds 30 characters (${hl.length} chars).`);
});
console.log('✔ Test 2: All 30 headlines are under Google\'s 30-character boundary.');

console.log('🎉 HEADLINE TESTS COMPLETED SUCCESSFUL!\n');
