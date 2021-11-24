/* eslint-env node */

const baseConfig = require('./jest-base.config');

module.exports = {
  ...baseConfig,
  coverageDirectory: 'coverage-local',
  collectCoverageFrom: ['{src,lib,lib-src}/**/*.{js,jsx,ts,tsx}'],
};
