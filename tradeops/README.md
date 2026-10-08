# TradeOps

A trading operations command center built by Alpha Soumaré.

**[Open the live app](https://tradeops-training.vercel.app/)**

## Features

- Settlement dashboard with KPIs calculated from a sample batch of 64 trades.
- Trade blotter with search, desk and status filters, pagination, and CSV export.
- Exception investigation, priority queues, separate matching and settlement actions.
- Trade details, lifecycle views, and a session activity log.
- Workload simulator with volume, capacity, and exception-rate sliders.
- Optional six-step onboarding with interactive highlights, actions, skip, and restart.
- Eight learning modules, 24 quiz questions, and independent simulated cases.
- Beginner, Intermediate, and Advanced paths with performance-based recommendations.
- Contextual explanations, glossary, earned badges, and saved browser progress.
- Responsive layout with Tailwind CSS v4 and shadcn/ui components.

All trade records and prices are synthetic. Workspace changes reset on page reload; tutorial progress saves in browser local storage (versioned as `tradeops.learning.v1`). Progress is device-specific and does not require an account. The app does not connect to a broker, bank, or market-data service.

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
node --experimental-strip-types --test tests/*.test.mjs

# Production build
pnpm build
```

## Project structure

| Path | Purpose |
| --- | --- |
| `app/page.tsx` | Dashboard, blotter, exceptions, simulator, and interactions |
| `app/globals.css` | Tailwind imports, design tokens, and responsive styling |
| `lib/learning.ts` | Curriculum, quiz scoring, completion rules, and saved-progress validation |
| `components/learning/` | Onboarding, explanations, lessons, quizzes, and practice lab |
| `app/learning.css` | Responsive learning interface and tutorial highlights |
| `tests/learning.test.mjs` | Progress recovery, scoring, completion, and recommendations |
| `lib/operations.ts` | Sample records, KPIs, trade transitions, and capacity model |
| `tests/operations.test.mjs` | Calculation and lifecycle checks |
| `components/ui/` | Shared shadcn/ui controls |
| `public/favicon.svg` | TradeOps icon |

## Model assumptions

Fixed-income quotes are prices per $100 par; equities and ETF prices are per share. Clearing a sample exception moves the trade to Matched. A separate action marks a matched trade Settled.

The stress simulator is an illustrative capacity model. Exceptions stay open and clean trades settle up to available capacity. It does not predict actual settlement outcomes or simulate funding, inventory, or market prices.

## Host on Vercel

This app has a standalone Vite build for Vercel. It uses the existing dashboard and sample data, without Base44 services or hosting credentials.

Import this repository in Vercel and use these settings:

| Setting | Value |
| --- | --- |
| Root Directory | `tradeops` |
| Framework | Vite |
| Build Command | `npm run build:vercel` |
| Output Directory | `dist-vercel` |
| Environment variables | None required |

The build and SPA routing are configured in `vercel.json`. Pushes to the linked production branch can deploy automatically.

For the standalone version locally:

```bash
pnpm dev:vercel
pnpm build:vercel
```

## Stack

React, TypeScript, Vinext, Tailwind CSS v4, shadcn/ui, Lucide icons, and Cloudflare-compatible build tooling. Dependency versions are pinned in `pnpm-lock.yaml`.
