const { pathsToModuleNameMapper } = require('ts-jest/utils')
const { compilerOptions } = require('./tsconfig')

module.exports = {
  preset: 'ts-jest',
  setupFiles: ['<rootDir>/src/scripts/jest-setup.js'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '<rootDir>/src/**/*.tsx'],
  coverageDirectory: './src/tests/coverage',
  coveragePathIgnorePatterns: ['<rootDir>[/\\\\](node_modules|src/types|src/tests|src/scripts)[/\\\\]', 'index.tsx'],
  modulePathIgnorePatterns: ['<rootDir>[/\\\\](node_modules)[/\\\\]'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  moduleNameMapper: {
    '^.+.(?=.*scss|sass|css|jpg|png).*': '<rootDir>/src/scripts/css-stub.js',
    ...pathsToModuleNameMapper(compilerOptions.paths, {
      prefix: '<rootDir>/'
    })
  },
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0
    }
  }
}