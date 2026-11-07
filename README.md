# ChargeShare ⚡
Peer-to-peer home EV charger marketplace MVP (India-focused).

## Prerequisites
- Node.js 20+
- npm
- A Supabase project

## Setup
1. Create a Supabase project, then copy `.env.example` to `.env.local`.
2. In Supabase **Project Settings → API**, set `NEXT_PUBLIC_SUPABASE_URL` and the server-only `SUPABASE_SERVICE_ROLE_KEY`.
3. Install the Supabase CLI and authenticate it: `npm install -g supabase`, then `supabase login`.
4. From this project, link the app and create its schema/data: `supabase link --project-ref <your-project-ref>` followed by `npm run db:setup`.
5. Run `npm install`, then `npm run dev`.
6. Visit http://localhost:3000.

The migration is in `supabase/migrations/` and seed data is in `supabase/seed.sql`. You can also paste each file into the Supabase SQL Editor, in that order.

## Development fallback
Payments are clearly marked mock mode by default. Configure Razorpay test credentials and implement server-side order/signature verification before enabling Razorpay mode. Google Maps requires a key; the MVP uses a location list fallback.

## MVP scope
The homepage fetches live chargers from the Supabase-backed API and falls back to local demo cards until the database is configured. The Supabase schema covers users, chargers, bookings, sessions, reviews, favorites, notifications and admin actions. APIs include charger browsing and booking overlap checks. Add Supabase Auth, payment verification, rate limiting, email, map provider, moderation, and deployment secrets before a public launch.

## Deploy
Deploy Next.js to a Node-compatible host (e.g. Vercel) and add the same environment variables there. Run the Supabase migration before deployment. Never expose `SUPABASE_SERVICE_ROLE_KEY` to browser code.
