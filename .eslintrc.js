module.exports = {
  root: true,
  extends: ['react-app', 'prettier/@typescript-eslint', 'plugin:prettier/recommended'],

  settings: {
    react: {
      version: 'detect',
    },
  },

  ignorePatterns: [
    'build/',
    'dist/',
    'coverage/',
    'coverage-local/',
    'node_modules/',
    'storybook-static/',
  ],
};
