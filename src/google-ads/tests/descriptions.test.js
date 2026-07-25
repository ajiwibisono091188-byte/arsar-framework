import assert from 'assert';
import { DescriptionGenerator } from '../descriptions/description-generator.js';

console.log('--- Running Descriptions Generator Unit Tests ---');

const input = {
  company: "YogaDAI",
  offer: "Kredit BPKB Mobil",
  location: "Surabaya",
  usp: "Bunga Paling Rendah"
};

const descriptions = DescriptionGenerator.generate(input);

// Test 1: Check array size is exactly 15
assert.strictEqual(descriptions.length, 15);
console.log('✔ Test 1: Generated descriptions array size is exactly 15.');

// Test 2: Check length of each description <= 90 chars
descriptions.forEach((desc, i) => {
  assert.ok(desc.length <= 90, `Description "${desc}" at index ${i} exceeds 90 characters (${desc.length} chars).`);
});
console.log('✔ Test 2: All 15 descriptions are under Google\'s 90-character boundary.');

console.log('🎉 DESCRIPTION TESTS COMPLETED SUCCESSFUL!\n');
