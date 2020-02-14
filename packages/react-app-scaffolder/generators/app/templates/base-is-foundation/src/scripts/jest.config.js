const baseConfig = require('../../jest.config')
const { compilerOptions } = require('./tsconfig.json.js')

module.exports = {
  ...baseConfig,
  moduleNameMapper: {
    '^.+.(?=.*scss|sass|css|jpg).*': '<rootDir>/src/scripts/css-stub.js',
    ...pathsToModuleNameMapper(compilerOptions.paths, {
      prefix: '<rootDir>/',
    }),
  },
}
