/* eslint-env node */

module.exports = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|/tests/.*|(\\.|/)(test|spec))\\.[jt]sx?$',
  moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx', 'node'],
  modulePathIgnorePatterns: ['dist/'],
  collectCoverage: true,
  coverageReporters: ['json', 'html', 'lcov'],
};
