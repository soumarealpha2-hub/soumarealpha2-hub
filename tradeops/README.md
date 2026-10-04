# TradeOps

A trading operations command center built by Alpha Soumaré.

**[Open the live app](https://tradeops.soumarealpha2.chatgpt.site)**

## Features

- Settlement dashboard with KPIs calculated from a sample batch of 64 trades.
- Trade blotter with search, desk and status filters, pagination, and CSV export.
- Exception investigation, priority queues, separate matching and settlement actions.
- Trade details, lifecycle views, and a session activity log.
- Workload simulator with volume, capacity, and exception-rate sliders.
- Responsive layout with Tailwind CSS v4 and shadcn/ui components.

All trade records and prices are synthetic. Changes reset on page reload. The app does not connect to a broker, bank, or market-data service.

## Run locally

Requires Node.js 22.13 or newer and pnpm.

```bash
git clone https://github.com/soumarealpha2-hub/soumarealpha2-hub.git
cd soumarealpha2-hub/tradeops
pnpm install --frozen-lockfile
pnpm dev
```

Open http://localhost:5173.

```bash
# Type check
pnpm exec tsc --noEmit

# Core calculations and trade lifecycle checks
node --experimental-strip-types --test tests/operations.test.mjs

# Production build
pnpm build
```

## Project structure

| Path | Purpose |
| --- | --- |
| `app/page.tsx` | Dashboard, blotter, exceptions, simulator, and interactions |
| `app/globals.css` | Tailwind imports, design tokens, and responsive styling |
| `lib/operations.ts` | Sample records, KPIs, trade transitions, and capacity model |
| `tests/operations.test.mjs` | Calculation and lifecycle checks |
| `components/ui/` | Shared shadcn/ui controls |
| `public/favicon.svg` | TradeOps icon |

## Model assumptions

Fixed-income quotes are prices per $100 par; equities and ETF prices are per share. Clearing a sample exception moves the trade to Matched. A separate action marks a matched trade Settled.

The stress simulator is an illustrative capacity model. Exceptions stay open and clean trades settle up to available capacity. It does not predict actual settlement outcomes or simulate funding, inventory, or market prices.

## Stack

React, TypeScript, Vinext, Tailwind CSS v4, shadcn/ui, Lucide icons, and Cloudflare-compatible build tooling. Dependency versions are pinned in `pnpm-lock.yaml`.
