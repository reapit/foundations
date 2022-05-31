const { pathsToModuleNameMapper } = require('ts-jest')
const { jestGlobalConfig } = require('@reapit/ts-scripts')
const { compilerOptions } = require('./tsconfig')
const path = require('path')

module.exports = {
  ...jestGlobalConfig,
  testPathIgnorePatterns: ['<rootDir>/src/tests/'],
  moduleNameMapper: {
    '^nanoid': path.join(__dirname, '../..', 'node_modules/nanoid/index.cjs'),
    ...jestGlobalConfig.moduleNameMapper,
    ...pathsToModuleNameMapper(compilerOptions.paths, {
      prefix: '<rootDir>/',
    }),
  },
  coveragePathIgnorePatterns: ['<rootDir>/src/tests', 'index.ts', 'index.tsx'],
  coverageThreshold: {
    global: {
      branches: 35,
      functions: 33,
      lines: 49,
      statements: 48,
    },
  },
}
