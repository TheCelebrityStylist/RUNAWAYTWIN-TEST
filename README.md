# RunwayTwin — Enterprise

## Setup
```bash
cp .env.example .env.local
pnpm install
pnpm dev
```
Open http://localhost:3000

## Features
- One free look per session; then **credits** or **bundle** required.
- Stripe checkout + webhook adds credits (mock fallback).
- NextAuth (Credentials dev + Email provider placeholder).
- Save outfits (Supabase or local JSON).
- Real provider stubs (Amazon/Awin/Rakuten) + mock provider; affiliate link wrapper.
- Palette filtering, ranking, creator storefronts with UTM campaign.
- Price-drop cron (mock) via Resend.
- SEO: sitemap, robots, JSON-LD.

## Webhooks
Point Stripe webhook to `/api/pay/webhook`. In mock mode, hitting the endpoint credits a demo user.

## Tests
`pnpm test` (Vitest), `pnpm dev` then `pnpm e2e` (Playwright).

## Deploy
Push to GitHub, import to Vercel, set env vars. Done.
