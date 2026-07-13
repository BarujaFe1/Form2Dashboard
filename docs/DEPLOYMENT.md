# Deployment — Form2Dashboard

## Target

Static-friendly **Vercel** deployment of the Next.js App Router app.

Live demo (expected): https://form2dashboard.vercel.app

## Prerequisites

- Node.js 20+
- npm
- Vercel account (optional for local preview)

## Environment

No secrets are required. See `.env.example`.

Optional:

```bash
NEXT_PUBLIC_SITE_URL=https://form2dashboard.vercel.app
```

## Local production check

```bash
npm ci
npm run lint
npm run typecheck
npm run test
npm run build
npm start
```

Open http://localhost:3000

## Deploy with Vercel CLI

```bash
npx vercel
npx vercel --prod
```

Or connect the GitHub repo in the Vercel dashboard (Framework Preset: Next.js).

## Build notes

- Next.js 16 / Turbopack production build
- Routes: `/` and `/_not-found` (static)
- Seed CSV is served from `public/seed/leads-operacionais.csv`

## Demo mode

On the landing page, **Carregar dados de exemplo** loads the public seed CSV and jumps to mapping with auto-detected columns. This is the recommended recruiter walkthrough path.

## Rollback

Redeploy previous Vercel deployment from the dashboard; no migrations or data stores to roll back.
