# Portfolio v4 Sanity Studio

## Environment setup

Create a local env file before starting the Studio or deploying it:

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
npm install
```

Start the Studio:

```bash
npm run dev
```

## Deploying the Studio

Deploy the Studio after schema or Studio code changes, for example:

1. adding or changing schema fields
2. updating validation
3. changing Studio configuration
4. changing custom Studio code

Before deploying:

1. make sure `.env.local` is present with the correct `SANITY_STUDIO_PROJECT_ID`, `SANITY_STUDIO_DATASET`, and `SANITY_STUDIO_APP_ID`
2. install dependencies with `npm install`
3. log in to Sanity if needed

If you are not authenticated yet:

```bash
npx sanity login
```

Build and deploy:

```bash
npm run build
npm run deploy
```

## First deployment or app ID changes

This Studio uses the deployment configuration in `sanity.cli.ts`, including:

```bash
deployment.appId = SANITY_STUDIO_APP_ID
```

Set `SANITY_STUDIO_APP_ID` to the Studio app ID from your Sanity project before running `npm run deploy`. If the app ID changes, update the env value and redeploy.

## When to deploy

Use this quick rule:

1. Content-only change: publish the document.
2. Schema or Studio code change: deploy the Studio.
3. Frontend rendering change in the main app: deploy the website separately.

## Reference

- https://www.sanity.io/docs/environment-variables
- https://www.sanity.io/docs/datasets
