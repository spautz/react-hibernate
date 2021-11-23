/* eslint-env node */

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react', 'react-hooks'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'prettier',
  ],

  settings: {
    react: {
      version: 'detect',
    },
  },

  rules: {
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
  },
  overrides: [
    {
      // Allow `require` in dev configs
      files: ['./.storybook/*', './*.config.*', './packages/*/*.config.*'],
      env: {
        node: true,
      },
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
    {
      // Test files are test files
      files: ['**/*.test.*', '**/__tests__/*.*'],
      env: {
        jest: true,
      },
    },
  ],

  ignorePatterns: [
    '!.storybook/',
    'build/',
    'coverage/',
    'coverage-local/',
    'dist/',
    'legacy-types/',
    'lib-dist/',
    'node_modules/',
    'storybook-static/',
  ],
};
