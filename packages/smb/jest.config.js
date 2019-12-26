const { pathsToModuleNameMapper } = require('ts-jest/utils')
const baseConfig = require('../../jest.config')
const { compilerOptions } = require('./tsconfig.json')

module.exports = {
  ...baseConfig,
  transform: {
    '^.+\\.graphql$': 'jest-transform-graphql',
  },
  moduleNameMapper: {
    '^.+.(?=.*scss|sass|css|jpg).*': '<rootDir>/src/scripts/css-stub.js',
    ...pathsToModuleNameMapper(compilerOptions.paths, {
      prefix: '<rootDir>/',
    }),
  },
  coverageThreshold: {
    global: {
      branches: 75,
      functions: 80,
      lines: 90,
      statements: 90,
    },
  },
}
