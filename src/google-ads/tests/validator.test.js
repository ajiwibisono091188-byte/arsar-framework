import assert from 'assert';
import { AdsValidator } from '../validator/ads-validator.js';

console.log('--- Running Ads Validator Unit Tests ---');

const mockCleanData = {
  headlines: ["Official Gadai BPKB", "Cepat Cair 24 Jam"],
  descriptions: ["Ajukan gadai bpkb resmi aman terpercaya bunga rendah.", "Proses kilat tanpa BI checking online."]
};

// Test 1: Clean data passes
const resClean = AdsValidator.validate(mockCleanData);
assert.ok(resClean.isValid);
console.log('✔ Test 1: Clean campaign assets passed validator.');

// Test 2: Headline exceeds 30 chars
const badLength = {
  ...mockCleanData,
  headlines: ["Official Gadai BPKB Mobil Motor Paling Murah Sekali"] // 50 chars!
};
const resLength = AdsValidator.validate(badLength);
assert.ok(!resLength.isValid);
assert.ok(resLength.errors.some(err => err.includes('exceeds maximum length of 30')));
console.log('✔ Test 2: Maximum 30 character boundary checked.');

// Test 3: Duplicates headline
const badDup = {
  ...mockCleanData,
  headlines: ["Official Gadai BPKB", "Official Gadai BPKB"]
};
const resDup = AdsValidator.validate(badDup);
assert.ok(!resDup.isValid);
assert.ok(resDup.errors.some(err => err.includes('Duplicate headline detected')));
console.log('✔ Test 3: Duplicate asset checks passed.');

console.log('🎉 ADS VALIDATOR TESTS COMPLETED SUCCESSFUL!\n');
