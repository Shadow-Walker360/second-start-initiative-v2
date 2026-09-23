# Second Start Initiative — Frontend

Production frontend for secondstartinitiative.org, built with Next.js (App
Router), TypeScript, and Tailwind CSS.

## Stack

- **Next.js 16** (App Router, static generation) — every marketing page is
  prerendered at build time for SEO and speed.
- **TypeScript**
- **Tailwind CSS v4**
- **Self-hosted fonts** (`@fontsource/fraunces`, `@fontsource/work-sans`) —
  no runtime calls to Google Fonts.
- No UI framework/component library — hand-built components to keep the
  bundle small and avoid unused abstractions.

## Local development

```bash
npm install
cp .env.example .env.local   # then fill in NEXT_PUBLIC_API_URL
npm run dev
```

Open http://localhost:3000.

## Environment variables

See `.env.example`. Both are safe to leave unset locally — the site still
builds and renders; the Volunteer, Get Involved, and Donate forms will show
a "can't reach the server" message instead of failing silently until
`NEXT_PUBLIC_API_URL` points at a running backend.

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Recommended | Canonical URL used in metadata, sitemap, OG tags |
| `NEXT_PUBLIC_API_URL` | Required for forms to work | Base URL of the SSI backend API |

## Backend contract

The frontend expects three JSON endpoints on the backend (see
`src/lib/api.ts` for exact request/response shapes):

- `POST /api/v1/volunteers` — volunteer applications
- `POST /api/v1/inquiries` — partner/mentor/general inquiries from Get Involved
- `POST /api/v1/donations` — donation initiation; returns `{ reference, nextStep? }`

These routes don't exist on the backend yet (see the Phase 1 audit) — the
frontend is ready to call them the moment they're implemented and deployed.

## Build & verify

```bash
npm run build   # production build — currently PASSES, all pages static
npx tsc --noEmit
npx eslint .
```

## Deployment

Designed for Vercel (zero-config for Next.js):

1. Push this project to its own GitHub repo (or a `frontend/` subfolder).
2. Import into Vercel, set the two environment variables above.
3. Point your domain's DNS at Vercel.

## What's intentionally not here

- No fake payment success states — the Donate form only shows what the
  backend actually returns.
- No fabricated testimonials — the Testimonials page is an honest
  "collecting real stories" state until real, consented quotes exist.
- No images without a known source — one photo from the original repo
  (credited to an outside photographer in its filename) was left out
  rather than presented as SSI's own.
