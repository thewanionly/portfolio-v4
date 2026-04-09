# Portfolio v4

Version 4 of my portfolio website.

## Technologies

1. Astro
2. React
3. TypeScript
4. TailwindCSS
5. Sanity CMS

## Frontend development

Create a local env file for the Astro app:

```bash
cp .env.example .env.local
```

Add your Sanity project values:

```bash
PUBLIC_SANITY_PROJECT_ID=
PUBLIC_SANITY_DATASET=
```

Start the frontend locally:

```bash
npm run dev
```

Build the frontend:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Sanity Studio setup

Install dependencies for the Studio:

```bash
cd studio-portfolio-v4
npm install
```

Create a local env file for the Studio:

```bash
cp .env.example .env.local
```

Sanity Studio reads these variables from `studio-portfolio-v4/.env.local`:

```bash
SANITY_STUDIO_PROJECT_ID=
SANITY_STUDIO_DATASET=
SANITY_STUDIO_APP_ID=
```

Fill those values from your Sanity project settings before starting the Studio.

Run the Studio locally from the Studio directory:

```bash
npm run dev
```

Or run it from the project root:

```bash
npm run studio:dev
```

## Deploying Sanity Studio

Deploy the Studio when you change Studio code, such as:

1. schema types
2. validation rules
3. Studio configuration
4. custom desk structure or widgets

Before deploying:

1. make sure `studio-portfolio-v4/.env.local` includes `SANITY_STUDIO_PROJECT_ID`, `SANITY_STUDIO_DATASET`, and `SANITY_STUDIO_APP_ID`
2. install Studio dependencies with `npm install`
3. log in to Sanity if needed

From the repo root:

```bash
npm run studio:build
npm run studio:deploy
```

Or from inside `studio-portfolio-v4`:

```bash
npm run build
npm run deploy
```

If needed, log in first:

```bash
cd studio-portfolio-v4
npx sanity login
```

The Studio deployment uses `SANITY_STUDIO_APP_ID` from `studio-portfolio-v4/.env.local`. If that app ID changes, update the env value and redeploy.

## Deploying the website

Deploy the frontend site separately after changes under `src/`, `public/`, or root app config.

In short:

1. Publishing content in Sanity updates content.
2. Deploying Sanity Studio updates the CMS interface/schema.
3. Deploying the frontend updates the website code.
