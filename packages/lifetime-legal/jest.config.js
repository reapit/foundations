const { pathsToModuleNameMapper } = require('ts-jest/utils')
const baseConfig = require('../../jest.config')
const { compilerOptions } = require('./tsconfig.json')

module.exports = {
  ...baseConfig,
  moduleNameMapper: {
    '^.+.(?=.*scss|sass|css|png|jpg).*': '<rootDir>/src/scripts/css-stub.js',
    '^@reapit/cognito-auth$': '<rootDir>/../cognito-auth/src/index.ts',
    ...pathsToModuleNameMapper(compilerOptions.paths, {
      prefix: '<rootDir>/',
    }),
  },
  coveragePathIgnorePatterns: [
    '<rootDir>[/\\\\](node_modules|src/types|src/tests|src/scripts)[/\\\\]',
    'mock-router.ts',
    'api.ts'
  ],
  coverageThreshold: {
    global: {
      branches: 67,
      functions: 80,
      lines: 90,
      statements: 90,
    },
  },
}

