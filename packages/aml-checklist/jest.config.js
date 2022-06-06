const { pathsToModuleNameMapper } = require('ts-jest')
const { jestGlobalConfig } = require('@reapit/ts-scripts')
const { compilerOptions } = require('./tsconfig')

module.exports = {
  ...jestGlobalConfig,
  moduleNameMapper: {
    ...jestGlobalConfig.moduleNameMapper,
    ...pathsToModuleNameMapper(compilerOptions.paths, {
      prefix: '<rootDir>/',
    }),
  },
  coveragePathIgnorePatterns: [
    '<rootDir>/src/helper/mock',
    '<rootDir>/src/services',
    '<rootDir>/src/tests',
    '.d.ts',
    'index.tsx',
    'index.ts',
    'api.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 56,
      functions: 72,
      lines: 83,
      statements: 82,
    },
  },
}
