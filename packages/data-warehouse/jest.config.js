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
  coveragePathIgnorePatterns: ['<rootDir>/src/tests', 'index.ts', 'index.tsx'],
  coverageThreshold: {
    global: {
      branches: 62,
      functions: 70,
      lines: 88,
      statements: 84,
    },
  },
}
