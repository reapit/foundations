const baseConfig = require('../../scripts/jest/jest.config')
const { pathsToModuleNameMapper } = require('ts-jest/utils')
const { compilerOptions } = require('./tsconfig.json')

module.exports = {
  ...baseConfig,
  testPathIgnorePatterns: ['<rootDir>/src/tests/'],
  coveragePathIgnorePatterns: [
    '<rootDir>[/\\\\](node_modules|src/types|src/tests|src/scripts|src/__stubs__|dist)[/\\\\]',
    '.d.ts',
    'index.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 81,
      functions: 95,
      lines: 91,
      statements: 92,
    },
  },
  moduleNameMapper: {
    ...baseConfig.moduleNameMapper,
    ...pathsToModuleNameMapper(compilerOptions.paths, {
      prefix: '<rootDir>/',
    }),
  },
}
