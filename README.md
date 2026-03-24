# Portfolio v4

Version 4 of my portfolio website.

## Technologies

1. Astro
2. React
3. TypeScript
4. TailwindCSS
5. Sanity CMS

## Development

Starting the local dev server

Create a local env file for the Astro app:

```bash
cp .env.example .env.local
```

Add your Sanity project values:

```bash
PUBLIC_SANITY_PROJECT_ID=
PUBLIC_SANITY_DATASET=
```

```bash
npm run dev
```

## Get started with Sanity

Install dependencies for the Studio:

```bash
cd studio-portfolio-v4
pnpm install
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

Run the Studio locally:

```bash
pnpm dev
```

Or run it from the project root:

```bash
pnpm studio:dev
```

Building the site

```bash
npm run build
```

Previewing local build

```bash
npm run preview
```
