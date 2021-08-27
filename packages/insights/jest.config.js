const { jestGlobalConfig } = require('@reapit/ts-scripts')
const { pathsToModuleNameMapper } = require('ts-jest/utils')
const { compilerOptions } = require('./tsconfig')

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
      branches: 30,
      functions: 30,
      lines: 60,
      statements: 50,
    },
  },
  moduleNameMapper: {
    ...jestGlobalConfig.moduleNameMapper,
    ...pathsToModuleNameMapper(compilerOptions.paths, {
      prefix: '<rootDir>/',
    }),
  },
}
