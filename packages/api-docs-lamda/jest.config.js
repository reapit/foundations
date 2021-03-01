const { jestGlobalConfig } = require('@reapit/ts-scripts')
const { pathsToModuleNameMapper } = require('ts-jest/utils')
const { compilerOptions } = require('./tsconfig.json')

module.exports = {
  ...jestGlobalConfig,
  coveragePathIgnorePatterns: [
    '<rootDir>[/\\\\](node_modules|dist)[/\\\\]',
  ],
  moduleNameMapper: {
    '^@[/](.+)': '<rootDir>/src/$1',
    ...pathsToModuleNameMapper(compilerOptions.paths, {
      prefix: '<rootDir>/',
    }),
  },
  coverageThreshold: {
    global: {
      branches: 60,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
}
