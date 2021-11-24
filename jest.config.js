/* eslint-env node */

const baseConfig = require('./jest-base.config');

module.exports = {
  ...baseConfig,
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['packages/*/{src,lib,lib-src}/**/*.{js,jsx,ts,tsx}'],
};
