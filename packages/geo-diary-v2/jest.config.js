const { pathsToModuleNameMapper } = require('ts-jest/utils')
const baseConfig = require('../../scripts/jest/jest.config')
const { compilerOptions } = require('./tsconfig.json')

module.exports = {
  ...baseConfig,
  transform: {
    "\\.(gql|graphql)$": "jest-transform-graphql"
  },
  coveragePathIgnorePatterns: ['<rootDir>[/\\\\](node_modules|src/types|src/tests|src/scripts)[/\\\\]', 'index.ts'],
  moduleNameMapper: {
    ...baseConfig.moduleNameMapper,
    ...pathsToModuleNameMapper(compilerOptions.paths, {
      prefix: '<rootDir>/',
    }),
  },
  coverageThreshold: {
    global: {
      branches: 60,
      functions: 70,
      lines: 80,
      statements: 80,
    },
  },
}
