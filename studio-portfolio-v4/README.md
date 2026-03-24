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
SANITY_STUDIO_APP_ID=
```

Fill those values from your Sanity project settings. They are Studio configuration, not secrets, because Sanity exposes `SANITY_STUDIO_*` variables to the Studio bundle.

## Development

Install dependencies:

```bash
pnpm install
```

Start the Studio:

```bash
pnpm dev
```

## Reference

- https://www.sanity.io/docs/environment-variables
- https://www.sanity.io/docs/datasets
