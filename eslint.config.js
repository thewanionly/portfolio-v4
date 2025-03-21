import eslintPluginAstro from 'eslint-plugin-astro';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

// References:
// 1. https://ota-meshi.github.io/eslint-plugin-astro/user-guide/
// 2. https://github.com/withastro/docs/blob/main/eslint.config.mjs

export default [
  {
    ignores: ['**/node_modules', '**/.astro'],
  },
  // Global config
  // JavaScript
  eslint.configs.recommended,

  // TypeScript
  ...tseslint.configs.recommended,

  // Astro
  ...eslintPluginAstro.configs.recommended,

  // A11Y
  ...eslintPluginAstro.configs['jsx-a11y-recommended'],
  {
    rules: {
      // override/add rules settings here, such as:
      'astro/no-set-html-directive': 'error',
    },
  },
];
