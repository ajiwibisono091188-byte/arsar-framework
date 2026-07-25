import assert from 'assert';
import { KnowledgeEngine } from '../engine/knowledge-engine.js';
import { KnowledgeScorer } from '../scoring/knowledge-scorer.js';

console.log('--- Running Knowledge Scorer Unit Tests ---');

const engine = new KnowledgeEngine();
const autoData = engine.getIndustry('Automotive Financing');

// Test 1: Perfect match (Industry + Audience + Offer + Keyword)
const project1 = {
  industry: 'Automotive Financing',
  audience: 'Pembeli Mobil Pertama',
  offer: 'Promo DP 10%',
  location: 'surabaya'
};

const score1 = KnowledgeScorer.calculateRelevance(project1, autoData);
assert.strictEqual(score1, 100, 'Perfect match should score 100.');
console.log('✔ Test 1: Perfect match score calculation passed.');

// Test 2: Partial match (Industry only)
const project2 = {
  industry: 'Automotive Financing',
  audience: 'Pekerja Tambang', // No match
  offer: 'Kredit HP', // No match
  location: 'medan' // No match
};

const score2 = KnowledgeScorer.calculateRelevance(project2, autoData);
assert.strictEqual(score2, 40, 'Industry match only should score 40.');
console.log('✔ Test 2: Partial match score calculation passed.');

// Test 3: Zero match
const project3 = {
  industry: 'Farming Technology',
  audience: 'Petani Guram'
};
const score3 = KnowledgeScorer.calculateRelevance(project3, autoData);
assert.strictEqual(score3, 0, 'Zero match should score 0.');
console.log('✔ Test 3: Zero match score calculation passed.');

console.log('🎉 KNOWLEDGE SCORER TESTS COMPLETED SUCCESSFUL!\n');
