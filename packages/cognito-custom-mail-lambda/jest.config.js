const { jestNodeGlobalConfig } = require('@reapit/ts-scripts')

module.exports = {
  ...jestNodeGlobalConfig,
  coveragePathIgnorePatterns: ['<rootDir>[/\\\\](node_modules|src/core)[/\\\\]', '<rootDir>/src/app.ts'],
  modulePathIgnorePatterns: ['<rootDir>[/\\\\](node_modules|public|dist)[/\\\\]'],
  coverageThreshold: {
    global: {
      branches: 10,
      functions: 8,
      lines: 12,
      statements: 10,
    },
  },
}
