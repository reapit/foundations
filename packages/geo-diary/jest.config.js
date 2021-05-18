const { pathsToModuleNameMapper } = require('ts-jest/utils')
const { jestGlobalConfig } = require('@reapit/ts-scripts')
const { compilerOptions } = require('./tsconfig.json')

module.exports = {
  ...jestGlobalConfig,
  coveragePathIgnorePatterns: ['<rootDir>[/\\\\](node_modules|src/types|src/tests|src/scripts|src/components/ui/icon/icons)[/\\\\]', 'index.ts', 'api.ts', 'service-worker.ts', '__mocks__'],
  moduleNameMapper: {
    ...jestGlobalConfig.moduleNameMapper,
    ...pathsToModuleNameMapper(compilerOptions.paths, {
      prefix: '<rootDir>/',
    }),
  },
  coverageThreshold: {
    global: {
      branches: 9,
      functions: 23,
      lines: 58,
      statements: 50,
    },
  },
}
