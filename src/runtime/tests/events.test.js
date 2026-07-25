import assert from 'assert';
import { EventBus } from '../events/event-bus.js';

console.log('--- Running Event Bus Unit Tests ---');

const bus = new EventBus();

// Test 1: Subscribe & emit
let eventFired = false;
let eventPayload = '';

const unsubscribe = bus.on('test_event', (payload) => {
  eventFired = true;
  eventPayload = payload;
});

bus.emit('test_event', 'hello_world');
assert.ok(eventFired);
assert.strictEqual(eventPayload, 'hello_world');
console.log('✔ Test 1: Event subscription and payload emission passed.');

// Test 2: Unsubscribe
eventFired = false;
unsubscribe();
bus.emit('test_event', 'new_payload');
assert.ok(!eventFired, 'Callback should not run after unsubscribing.');
console.log('✔ Test 2: Event unsubscription passed.');

// Test 3: Once subscription
let onceCount = 0;
bus.once('once_event', () => {
  onceCount++;
});

bus.emit('once_event');
bus.emit('once_event');
assert.strictEqual(onceCount, 1, 'Once subscription should only fire once.');
console.log('✔ Test 3: Once subscription execution passed.');

console.log('🎉 EVENT BUS TESTS COMPLETED SUCCESSFUL!\n');
