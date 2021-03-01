const { jestGlobalConfig } = require('@reapit/ts-scripts')

module.exports = {
  ...jestGlobalConfig,
  coveragePathIgnorePatterns: ['<rootDir>[/\\\\](node_modules|src/core)[/\\\\]', '<rootDir>/src/app.ts'],
  modulePathIgnorePatterns: ['<rootDir>[/\\\\](node_modules|public|dist)[/\\\\]'],
  coverageThreshold: {
    global: {
      branches: 88.46,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
}
