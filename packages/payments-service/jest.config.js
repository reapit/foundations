const { jestNodeGlobalConfig } = require('@reapit/ts-scripts')
const { pathsToModuleNameMapper } = require('ts-jest')
const { compilerOptions } = require('./tsconfig.json')

module.exports = {
  ...jestNodeGlobalConfig,
  testPathIgnorePatterns: ['<rootDir>/src/tests/'],
  coveragePathIgnorePatterns: [
    '<rootDir>[/\\\\](node_modules|src/types|src/tests|src/scripts|src/__stubs__|dist)[/\\\\]',
    '.d.ts',
    'index.ts',
    'dto.ts',
    'module.ts',
    'model.ts',
    'config.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 26,
      functions: 83,
      lines: 76,
      statements: 75,
    },
  },
  moduleNameMapper: {
    ...jestNodeGlobalConfig.moduleNameMapper,
    ...pathsToModuleNameMapper(compilerOptions.paths, {
      prefix: '<rootDir>/',
    }),
  },
}
