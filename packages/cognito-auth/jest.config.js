const { pathsToModuleNameMapper } = require('ts-jest/utils')
const { compilerOptions } = require('./tsconfig.json')
const baseConfig = require('../../jest.config')

module.exports = {
  ...baseConfig,
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths, {
      prefix: '<rootDir>/',
    }),
  },
  coveragePathIgnorePatterns: [
    "<rootDir>[/\\\\](node_modules|src/core)[/\\\\]",
    "<rootDir>/src/app.ts",
    "<rootDir>/src/app.dev.ts",
    "<rootDir>/src/index.ts"
  ],
}