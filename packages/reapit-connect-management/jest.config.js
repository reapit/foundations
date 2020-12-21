const { pathsToModuleNameMapper } = require('ts-jest/utils')
const baseConfig = require('../../scripts/jest/jest.config')
const { compilerOptions } = require('./tsconfig')

module.exports = {
  ...baseConfig,
  testPathIgnorePatterns: ['<rootDir>/src/tests/'],
  moduleNameMapper: {
    ...baseConfig.moduleNameMapper,
    ...pathsToModuleNameMapper(compilerOptions.paths, {
      prefix: '<rootDir>/',
    }),
  },
  coveragePathIgnorePatterns: ['<rootDir>/src/services', '<rootDir>/src/tests'],
  coverageThreshold: {
    global: {
      branches: 25,
      functions: 43,
      lines: 66,
      statements: 65,
    },
  },
}
