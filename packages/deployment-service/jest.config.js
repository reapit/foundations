/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['<rootDir>/dist'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageDirectory: './src/tests/coverage',
  coveragePathIgnorePatterns: ['<rootDir>[/\\\\](node_modules|src/types|src/tests|src/scripts)[/\\\\]', '.d.ts'],
  reporters: ['default', 'github-actions'],
  coverageThreshold: {
    global: {
      branches: 60,
      functions: 40,
      lines: 60,
      statements: 40,
    },
  },
  coverageReporters: ['json-summary', 'text', 'lcov'],
}
