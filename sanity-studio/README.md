# Portfolio v4 Sanity Studio

## Environment setup

Create a local env file before starting the Studio:

```bash
cp .env.example .env.local
```

Required variables:

```bash
SANITY_STUDIO_PROJECT_ID=
SANITY_STUDIO_DATASET=
```

Fill those values from your Sanity project settings. They are Studio configuration, not secrets, because Sanity exposes `SANITY_STUDIO_*` variables to the Studio bundle.

## Development

Install dependencies:

```bash
pnpm install
```

Start the Studio:

```bash
pnpm run dev
```

Build the Studio:

```bash
pnpm run build
```

## Vercel Deployment

This Studio is deployed through Vercel, so deployment is handled by Vercel from the build output instead of `sanity deploy`.

Deploy the Studio after schema or Studio code changes, for example:

1. adding or changing schema fields
2. updating validation
3. changing Studio configuration
4. changing custom Studio code

Use these Vercel settings when this folder is the Vercel project root:

```bash
Build Command: pnpm build
Output Directory: dist
```

Add these environment variables in Vercel:

```bash
SANITY_STUDIO_PROJECT_ID=
SANITY_STUDIO_DATASET=
```

If the Vercel project uses the repository root instead, use:

```bash
Build Command: pnpm studio:build
Output Directory: sanity-studio/dist
```

## When changes take effect

Use this quick rule:

1. Content-only change: publish the document.
2. Schema or Studio code change: deploy the Studio.
3. Frontend rendering change in the main app: deploy the website separately.

## Reference

- https://www.sanity.io/docs/environment-variables
- https://www.sanity.io/docs/datasets
