/* eslint-env node */

module.exports = {
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['packages/*/src/**/*.{js,jsx,ts,tsx}'],
  coveragePathIgnorePatterns: [
    '.*\\.(ignored|stories|test)\\.*',
    'node_modules/',
    'packages/dev-helpers/',
  ],
};
