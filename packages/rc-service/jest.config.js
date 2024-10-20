const { pathsToModuleNameMapper } = require('ts-jest')
const { jestGlobalConfig } = require('@reapit/ts-scripts')
const { compilerOptions } = require('./tsconfig')

module.exports = {
  ...jestGlobalConfig,
  testPathIgnorePatterns: ['<rootDir>/src/tests/'],
  moduleNameMapper: {
    ...jestGlobalConfig.moduleNameMapper,
    ...pathsToModuleNameMapper(compilerOptions.paths, {
      prefix: '<rootDir>/',
    }),
  },
  coveragePathIgnorePatterns: ['<rootDir>/src/tests'],
  coverageThreshold: {
    global: {
      branches: 40,
      functions: 44,
      lines: 72,
      statements: 71,
    },
  },
}
