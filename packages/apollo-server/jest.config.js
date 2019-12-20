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
  coveragePathIgnorePatterns: ['<rootDir>[/\\\\](node_modules|src/types|src/tests|src/scripts)[/\\\\]', 'api.ts', '.d.ts', 'index.ts', 'app.ts'],
  coverageThreshold: {
    global: {
      branches: 78,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
}
