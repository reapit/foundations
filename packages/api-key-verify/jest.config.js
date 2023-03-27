const { jestNodeGlobalConfig } = require('@reapit/ts-scripts')
const { pathsToModuleNameMapper } = require('ts-jest')
const { compilerOptions } = require('./tsconfig.json')

module.exports = {
  // ...jestNodeGlobalConfig,
  // testPathIgnorePatterns: ['<rootDir>/src/tests/'],
  // coveragePathIgnorePatterns: [
  //   '<rootDir>[/\\\\](node_modules|src/types|src/tests|src/scripts|src/__stubs__|dist)|config|core|models[/\\\\]',
  //   '.d.ts',
  //   'index.ts',
  //   '<rootDir>/src/api-key-model.ts',
  // ],
  // coverageThreshold: {
  //   global: {
  //     branches: 79,
  //     functions: 92,
  //     lines: 89,
  //     statements: 90,
  //   },
  // },
  // moduleNameMapper: {
  //   ...jestNodeGlobalConfig.moduleNameMapper,
  //   ...pathsToModuleNameMapper(compilerOptions.paths, {
  //     prefix: '<rootDir>/',
  //   }),
  // },
}
