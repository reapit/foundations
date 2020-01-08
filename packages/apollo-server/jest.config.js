const { pathsToModuleNameMapper } = require('ts-jest/utils')
const baseConfig = require('../../jest.config')
const { compilerOptions } = require('./tsconfig.json')

module.exports = {
  ...baseConfig,
  moduleNameMapper: {
    moduleNameMapper: {
      ...pathsToModuleNameMapper(compilerOptions.paths, {
        prefix: '<rootDir>/',
      }),
    },
  },
  coveragePathIgnorePatterns: ['<rootDir>[/\\\\](node_modules|src/types|src/tests|src/scripts|dist)[/\\\\]', 'api.ts', '.d.ts', 'index.ts'],
  coverageThreshold: {
    global: {
      branches: 82,
      functions: 97,
      lines: 97,
      statements: 97,
    },
  },
}
