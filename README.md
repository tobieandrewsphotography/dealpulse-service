# DealPulse Service

Monorepo Next.js 14 app that powers both DealPulse public-facing properties:

- **DealPulseScore.com** — marketing & sales site (route group: `(marketing)`)
- **DealPulseAgent.com** — agent onboarding portal (route group: `(onboarding)`, served under `/agent`)

Hostname routing is handled by `src/middleware.ts`: requests to `dealpulseagent.com` are rewritten to the `/agent/*` path prefix. In local dev, open `http://localhost:3000` for marketing and `http://localhost:3000/agent` for onboarding.

## Stack

- Next.js 14 App Router + TypeScript
- Tailwind CSS (Inter font)
- Supabase (subscribers, onboarding_submissions)
- Stripe subscription checkout + webhooks
- Resend transactional email
- React Hook Form + Zod

## Setup

```bash
cp .env.example .env.local   # fill in keys
npm install
npm run dev
```

Apply the database schema in `supabase/migrations/0001_init.sql` via Supabase SQL editor or `supabase db push`.

## Stripe products

Create two recurring prices in Stripe and place their IDs in `.env.local`:
- `STRIPE_PRICE_STANDARD` — $1,500/mo
- `STRIPE_PRICE_LENDER` — $1,250/mo (lender sponsor)

## Webhooks

Point Stripe to `https://dealpulseagent.com/api/stripe/webhook` with events:
- `checkout.session.completed`
- `customer.subscription.updated`
- `customer.subscription.deleted`

## Deploy

Deploy to Vercel, attach both domains (dealpulsescore.com, dealpulseagent.com) to the same project. Middleware handles hostname routing.
