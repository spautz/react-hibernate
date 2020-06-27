/* eslint-env node */
const baseConfig = require('../../jest-base.config');

module.exports = {
  ...baseConfig,
  coverageDirectory: 'coverage-local',
};
