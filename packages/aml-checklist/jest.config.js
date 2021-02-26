const { pathsToModuleNameMapper } = require('ts-jest/utils')
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
  snapshotSerializers: ['enzyme-to-json/serializer'],
  coverageThreshold: {
    global: {
      branches: 60,
      functions: 72,
      lines: 86,
      statements: 85
    }
  }
}
