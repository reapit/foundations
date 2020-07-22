const { pathsToModuleNameMapper } = require('ts-jest/utils')
const { compilerOptions } = require('./tsconfig.json')
const baseConfig = require('../../scripts/jest/jest.config')

module.exports = {
  ...baseConfig,
  modulePathIgnorePatterns: ['<rootDir>[/\\\\](node_modules|public|dist)[/\\\\]'],
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths, {
      prefix: '<rootDir>/',
    }),
  },
  coveragePathIgnorePatterns: [
    "<rootDir>[/\\\\](node_modules|src/tests|src/__mocks__)[/\\\\]",
    "<rootDir>/src/types.ts",
    "<rootDir>/src/index.ts",
    ".d.ts"
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 100,
      lines: 96,
      statements: 96,
    },
  },
}
