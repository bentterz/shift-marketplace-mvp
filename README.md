# Shift Marketplace (MVP)

A minimal full‑stack Next.js app for buying & selling used bikes, parts, and clothing — with an AI listing generator.

## What’s inside
- **Next.js 14 (App Router)** + TypeScript
- **Prisma** ORM with **SQLite** (easy local dev); swap to Postgres for prod
- Simple API routes for listings
- **AI listing generator** endpoint (uses OpenAI's Chat Completions API)
- Clean UI screens: Home, Sell (AI-assisted), Listings (browse)

> This is a starter MVP. Auth, file uploads, payments, search, and moderation hooks are left as stubs so you can evolve fast without bloat.

---

## Quick start

1) **Requirements**
- Node 20+
- npm or pnpm
- (Optional) Postgres if you want prod DB

2) **Install & run**
```bash
cp .env.example .env.local
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```

3) **Environment**
Edit `.env.local`:
```
DATABASE_URL="file:./dev.db"
OPENAI_API_KEY="sk-..."
NEXT_PUBLIC_SITE_NAME="Shift"
```

4) **AI listing generation**
- Go to **/sell**
- Add a short text (e.g., “Large 2020 Trek Fuel EX 9.7, carbon, GX, 29er, great condition”), optionally paste public image URLs
- Click **Generate** to auto-fill fields, then **Publish**

> For image uploads, wire any provider (S3, Supabase Storage, UploadThing, etc.) and pass the resulting public URLs to the AI endpoint.

5) **Project structure**
```
/prisma/schema.prisma          Prisma schema (SQLite by default)
/src/app/(marketing)/page.tsx  Home
/src/app/sell/page.tsx         Sell flow with AI assist
/src/app/listings/page.tsx     Listings grid
/src/app/api/ai/generate       AI generator endpoint
/src/app/api/listings          CRUD for listings
/src/components/*              UI components
/src/lib/*                     helpers (db, validation, ai schema)
/src/data/taxonomy.ts          categories and attributes
```

---

## Production next steps
- **Auth & Trust/Safety**: Add phone verification (e.g., Twilio), report/flag flow, rate limiting, content moderation. Consider ID verification for high-value sales.
- **Payments & Protection**: Stripe Checkout or Payment Links; consider an optional escrow (Stripe Connect + platform fees).
- **Search**: Typesense/Meilisearch for blazing-fast filters; add map search (PostGIS/Tile services).
- **Uploads**: S3/R2/Supabase Storage with signed URLs + on-the-fly image optimization (imgproxy/ImageKit).
- **Notifications**: Email (Resend), SMS (Twilio), push (Web Push/Firebase).
- **Admin**: Review queue, automated scam detection, duplicate detection, pricing hints from comps.
- **AI**: Better image understanding (component detection), pricing suggestions, scam score, tone/style normalization.

Have fun — and ship fast 🚴
