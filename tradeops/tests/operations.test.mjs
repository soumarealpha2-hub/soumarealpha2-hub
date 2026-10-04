import test from 'node:test';
import assert from 'node:assert/strict';
import { seedTrades, summarize, transitionTrade, notional, simulate } from '../lib/operations.ts';

test('sample batch partitions into settled, pending and exception records', () => {
  const trades = seedTrades();
  const s = summarize(trades);
  assert.equal(new Set(trades.map(t => t.id)).size, 64);
  assert.equal(s.settled, 55);
  assert.equal(s.breaks, 5);
  assert.equal(s.settled + s.pending + s.breaks, s.total);
  assert.equal(summarize([]).rate, 0);
});

test('clearing a break and settling are separate actions with consistent totals', () => {
  const start = seedTrades();
  const before = summarize(start);
  const id = start[0].id;
  const matched = transitionTrade(start, id);
  assert.equal(start[0].status, 'Exception');
  assert.equal(matched[0].status, 'Matched');
  assert.equal(summarize(matched).settled, before.settled);
  assert.equal(summarize(matched).breaks, before.breaks - 1);
  assert.equal(summarize(matched).risk, before.risk - notional(start[0]));
  const settled = transitionTrade(matched, id);
  assert.equal(summarize(settled).settled, before.settled + 1);
  assert.equal(summarize(settled).gross, before.gross);
  assert.throws(() => transitionTrade(settled, id), /already settled/);
  assert.throws(() => transitionTrade(start, 'missing'), /not found/);
});

test('bond quotes use price per hundred while equities use price per share', () => {
  const base = seedTrades()[0];
  assert.equal(notional({ ...base, desk: 'Fixed income', quantity: 1000000, price: 98 }), 980000);
  assert.equal(notional({ ...base, desk: 'Equities', quantity: 1000, price: 98 }), 98000);
});

test('capacity scenarios conserve trade counts and respond to staffing', () => {
  const normal = simulate(64, 0, 100, 0);
  assert.equal(normal.backlog, 0);
  assert.equal(normal.rate, 100);
  const overloaded = simulate(64, 75, 50, 10);
  const staffed = simulate(64, 75, 150, 10);
  assert.ok(staffed.backlog < overloaded.backlog);
  for (const s of [normal, overloaded, staffed]) {
    assert.equal(s.processed + s.backlog, s.incoming);
    assert.ok(s.processed <= s.capacity);
    assert.ok(s.backlog >= s.exceptions);
    assert.ok(s.rate >= 0 && s.rate <= 100);
  }
  assert.throws(() => simulate(64, -1, 100, 10), /range/);
  assert.throws(() => simulate(64, 0, 0, 10), /range/);
  assert.throws(() => simulate(64, 0, 100, NaN), /range/);
});
