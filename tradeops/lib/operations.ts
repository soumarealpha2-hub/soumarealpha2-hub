export type Status = 'Settled' | 'Matched' | 'Pending' | 'Exception' | 'Failed';
export type Desk = 'Equities' | 'Fixed income' | 'ETFs';
export type Trade = { id: string; symbol: string; name: string; desk: Desk; side: 'Buy' | 'Sell'; quantity: number; price: number; counterparty: string; status: Status; issue?: string; action?: string; priority?: 'High' | 'Medium'; owner: string; settlement: string; time: string };
export type Activity = { id: string; text: string; time: string; type: 'settlement' | 'exception' | 'match' };
const instruments: { symbol: string; name: string; desk: Desk; price: number }[] = [
  { symbol: 'AAPL', name: 'Apple Inc.', desk: 'Equities', price: 224.50 },
  { symbol: 'UST 4.25%', name: 'US Treasury · 2034', desk: 'Fixed income', price: 98.72 },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', desk: 'Equities', price: 127.84 },
  { symbol: 'SPY', name: 'S&P 500 ETF', desk: 'ETFs', price: 572.30 },
  { symbol: 'MSFT', name: 'Microsoft Corp.', desk: 'Equities', price: 428.12 },
  { symbol: 'CORP 5.1%', name: 'Corporate bond · 2031', desk: 'Fixed income', price: 101.24 },
  { symbol: 'QQQ', name: 'Nasdaq 100 ETF', desk: 'ETFs', price: 489.60 },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', desk: 'Equities', price: 187.25 },
];
const firms = ['Northstar Capital', 'Meridian Securities', 'Atlas Investments', 'Evergreen Partners'];
const issues = [
  { issue: 'Settlement instruction mismatch', action: 'Validate the account and replace the sample settlement instructions.', priority: 'High' as const },
  { issue: 'Cash funding shortfall', action: 'Confirm the funding allocation in this demo before matching the trade.', priority: 'High' as const },
  { issue: 'Quantity reconciliation break', action: 'Compare the allocated quantity with the booking and correct the sample record.', priority: 'Medium' as const },
  { issue: 'Counterparty confirmation missing', action: 'Confirm the sample counterparty allocation and clear the exception.', priority: 'Medium' as const },
  { issue: 'Securities unavailable', action: 'Confirm inventory availability and stage a sample settlement retry.', priority: 'High' as const },
];
export function seedTrades(): Trade[] {
  return Array.from({ length: 64 }, (_, i) => {
    const ins = instruments[i % instruments.length];
    const status: Status = i < 4 ? 'Exception' : i === 4 ? 'Failed' : i < 8 ? 'Matched' : i === 8 ? 'Pending' : 'Settled';
    return { ...ins, id: `TRD-${String(10428 + i)}`, side: i % 3 === 0 ? 'Sell' : 'Buy', quantity: (2 + (i * 7) % 19) * (ins.desk === 'Fixed income' ? 100000 : 1000), counterparty: firms[(i * 3) % 4], status, ...(i < 5 ? issues[i] : {}), owner: ['Alpha S.', 'Jordan K.', 'Priya M.'][i % 3], settlement: '02 Oct 2026', time: `${String(9 + Math.floor(i / 20)).padStart(2, '0')}:${String((i * 7) % 60).padStart(2, '0')}` };
  });
}
// Fixed-income quantities are face value; quoted prices are per $100 par.
export const notional = (t: Trade) => t.quantity * t.price / (t.desk === 'Fixed income' ? 100 : 1);
export const isBreak = (t: Trade) => t.status === 'Exception' || t.status === 'Failed';
export function summarize(trades: Trade[]) {
  const settled = trades.filter(t => t.status === 'Settled');
  const breaks = trades.filter(isBreak);
  return { total: trades.length, settled: settled.length, rate: trades.length ? settled.length / trades.length * 100 : 0, gross: trades.reduce((a, t) => a + notional(t), 0), risk: breaks.reduce((a, t) => a + notional(t), 0), breaks: breaks.length, pending: trades.length - settled.length - breaks.length, settledNotional: settled.reduce((a,t) => a + notional(t),0) };
}
export function transitionTrade(trades: Trade[], id: string): Trade[] {
  const trade = trades.find(t => t.id === id);
  if (!trade) throw new Error('Trade not found.');
  if (trade.status === 'Settled') throw new Error('This trade is already settled.');
  const next: Status = trade.status === 'Matched' ? 'Settled' : 'Matched';
  return trades.map(t => t.id === id ? { ...t, status: next, issue: undefined, action: undefined, priority: undefined } : t);
}
export function simulate(base: number, surge: number, capacityPct: number, breakRate: number) {
  if (![base,surge,capacityPct,breakRate].every(Number.isFinite) || base < 0 || surge < 0 || surge > 100 || capacityPct < 20 || capacityPct > 150 || breakRate < 0 || breakRate > 20) throw new Error('Scenario inputs are outside the supported range.');
  const incoming = Math.round(base * (1 + surge / 100));
  const capacity = Math.round(80 * capacityPct / 100);
  const exceptions = Math.round(incoming * breakRate / 100);
  const clean = incoming - exceptions;
  const processed = Math.min(clean, capacity);
  const backlog = incoming - processed;
  return { incoming, capacity, exceptions, processed, backlog, utilization: capacity ? clean / capacity * 100 : 0, rate: incoming ? processed / incoming * 100 : 100 };
}
export const money = (n: number) => n >= 1e6 ? `$${(n / 1e6).toFixed(2)}M` : n >= 1e3 ? `$${(n / 1e3).toFixed(1)}K` : `$${n.toFixed(0)}`;
