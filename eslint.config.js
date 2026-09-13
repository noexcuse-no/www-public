import globals from 'globals';

export default [
  {
    ignores: [
      'node_modules/**',
      '_site/**',
      '.jekyll-cache/**',
      '_includes/**',
      '_layouts/**',
      'scripts/**',
      'tests/**',
    ],
  },
  {
    files: ['assets/scripts/**/*.js'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'warn',
      semi: 'error',
      quotes: ['error', 'single'],
      indent: ['error', 4],
      'comma-dangle': ['error', 'never'],
      'no-multiple-empty-lines': ['error', { max: 1 }],
      'eol-last': 'error',
    },
  },
];
