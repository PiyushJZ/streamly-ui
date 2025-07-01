//  @ts-check

import { tanstackConfig } from '@tanstack/eslint-config';

export default [
  ...tanstackConfig,
  {
    ignores: [
      'dist',
      'build',
      'coverage',
      'node_modules',
      'public',
      'vite.config.js',
      'eslint.config.js',
    ],
  },
];
