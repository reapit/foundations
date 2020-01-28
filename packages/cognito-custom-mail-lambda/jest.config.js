const baseConfig = require('../../scripts/jest/jest.config')

module.exports = {
  ...baseConfig,
  coveragePathIgnorePatterns: ['<rootDir>[/\\\\](node_modules|src/core)[/\\\\]', '<rootDir>/src/app.ts'],
  modulePathIgnorePatterns: ['<rootDir>[/\\\\](node_modules|public|dist)[/\\\\]'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
}
