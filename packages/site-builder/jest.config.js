const { pathsToModuleNameMapper } = require('ts-jest/utils')
const { compilerOptions } = require('./tsconfig')
const baseConfig = require('../../scripts/jest/jest.config')

module.exports = {
  ...baseConfig,
  coveragePathIgnorePatterns: [
    '<rootDir>[/\\\\](node_modules|src/types|src/tests|src/scripts|src/components/editor-components)[/\\\\]',
    'index.ts',
  ],
  moduleNameMapper: {
    ...baseConfig.moduleNameMapper,
    ...pathsToModuleNameMapper(compilerOptions.paths, {
      prefix: '<rootDir>/',
    }),
  },
  coverageThreshold: {
    global: {
      branches: 45,
      functions: 60,
      lines: 80,
      statements: 80,
    },
  },
}
