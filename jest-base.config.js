/* eslint-env node */

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  collectCoverage: true,
  coverageReporters: ['json', 'html', 'lcov'],

  testPathIgnorePatterns: ['/build/', '/dist/', '/lib-dist/', '/node_modules/'],
  coveragePathIgnorePatterns: ['.*\\.(ignored|stories|test)\\.*', '__tests__'],

  // This base config is incomplete: the consumer should set `roots`, `coverageDirectory`, and `collectCoverageFrom`
};
