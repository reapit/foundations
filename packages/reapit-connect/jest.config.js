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
  snapshotSerializers: ['enzyme-to-json/serializer'],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 80,
      statements: 85,
    },
  },
}
