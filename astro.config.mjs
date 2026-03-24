// @ts-check
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

import icon from 'astro-icon';

import vercel from '@astrojs/vercel';

import sanity from '@sanity/astro';

function missingEnv(name) {
  throw new Error(`Missing ${name}. Add it to the root .env.local file.`);
}

const env = loadEnv(process.env.NODE_ENV ?? 'development', process.cwd(), '');
const sanityProjectId = env.PUBLIC_SANITY_PROJECT_ID || missingEnv('PUBLIC_SANITY_PROJECT_ID');
const sanityDataset = env.PUBLIC_SANITY_DATASET || missingEnv('PUBLIC_SANITY_DATASET');

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    react(),
    icon({
      iconDir: 'src/assets/icons',
    }),
    sanity({
      projectId: sanityProjectId,
      dataset: sanityDataset,
      useCdn: false, // for static builds
    }),
  ],
  output: 'server',
  adapter: vercel(),
});
