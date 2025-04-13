// eslint.config.mjs
import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';

export default [
  // JS Recommended Config
  pluginJs.configs.recommended,

  // TypeScript Recommended Configs
  ...tseslint.configs.recommended,

  // React Config (Flat style)
  pluginReact.configs.flat.recommended,

  // Your customizations
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      // you can add overrides here
    },
  },
 // Ignore vite.config.ts
  {
    ignores: ['vite.config.ts'],
  },
];