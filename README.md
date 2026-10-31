# Flata Software

Flata's website for website development, ongoing website care, and scoped technology support. Built with Next.js, React, TypeScript, and a static export.

## Run locally

Use Node.js 22.13 or newer.

```sh
npm ci
npm run dev
```

Open the local URL printed by the development server.

## Build and verify

```sh
npm run build
npm run verify
```

The production website is exported to `out/`. Verification checks the required pages, local links and assets, supporting demo runtime, demo disclosures, and the existing noindex policy.

## Source layout

- `app/`: website routes, layouts, and metadata.
- `components/flata/`: the main website, industry demos, and standalone-demo entry pages.
- `lib/redesign-metadata.ts`: page metadata and industry definitions.
- `public/assets/`: brand artwork, photography, social previews, icons, and local fonts.
- `scripts/verify-static.mjs`: static-export checks.
- `next.config.ts`: static export configuration.

The portfolio covers cleaning, home services, moving, auto detailing, and catering. The detailing and catering entries link to separate standalone websites; their application sources live in separate projects.

## Deployment

Deploy the contents of `out/` to a static host that supports directory index pages. The existing Sites project association is in `.openai/hosting.json`. GitHub stores the source; pushing this repository does not deploy a website or configure a custom domain.

The current preview origin is `https://flata-business.flata.chatgpt.site`. Before changing the production domain, update the origin in `app/layout.tsx`, `app/sitemap.ts`, `app/robots.ts`, and `lib/redesign-metadata.ts`, then rebuild and verify. Preserve the current noindex policy until public indexing is approved.

## Project boundaries

This repository contains the website source and its assets. Campaign ledgers, prospect lists, email records, payment details, credentials, installed dependencies, and generated build output are excluded. Enquiries use the visitor's email application; demo planners do not create real bookings or payments.
