const { pathsToModuleNameMapper } = require('ts-jest/utils')
const baseConfig = require('../../scripts/jest/jest.config')
const { compilerOptions } = require('./tsconfig')

module.exports = {
  ...baseConfig,
  moduleNameMapper: {
    ...baseConfig.moduleNameMapper,
    ...pathsToModuleNameMapper(compilerOptions.paths, {
      prefix: '<rootDir>/',
    }),
  },
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
