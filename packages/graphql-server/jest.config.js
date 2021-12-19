/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
const { jestGlobalConfig } = require('@reapit/ts-scripts')
const { pathsToModuleNameMapper } = require('ts-jest')
const { compilerOptions } = require('./tsconfig.json')

module.exports = {
  ...jestGlobalConfig,
  testPathIgnorePatterns: ['<rootDir>/src/tests/'],
  coveragePathIgnorePatterns: [
    '<rootDir>[/\\\\](node_modules|src/types|src/tests|src/scripts|src/__stubs__|dist)[/\\\\]',
    '.d.ts',
    'index.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 60,
      functions: 94.8,
      lines: 95,
      statements: 95,
    },
  },
  moduleNameMapper: {
    ...jestGlobalConfig.moduleNameMapper,
    ...pathsToModuleNameMapper(compilerOptions.paths, {
      prefix: '<rootDir>/',
    }),
  },
}
