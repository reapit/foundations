const { pathsToModuleNameMapper } = require('ts-jest/utils')
const { compilerOptions } = require('./tsconfig')

module.exports = {
  preset: 'ts-jest',
  testPathIgnorePatterns: ['<rootDir>/src/tests/'],
  setupFiles: ['<rootDir>/src/scripts/jest-setup.js'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '<rootDir>/src/**/*.tsx'],
  coverageDirectory: './src/tests/coverage',
  coveragePathIgnorePatterns: [
    '<rootDir>[/\\\\](node_modules|src/types|src/tests|src/scripts)[/\\\\]',
    '<rootDir>/src/sagas/api.ts',
    'service-worker.ts'
  ],
  modulePathIgnorePatterns: ['<rootDir>[/\\\\](node_modules)[/\\\\]'],
  moduleNameMapper: {
    '^.+.(?=.*scss|sass|css|jpg).*': '<rootDir>/src/scripts/css-stub.js',
    ...pathsToModuleNameMapper(compilerOptions.paths, {
      prefix: '<rootDir>/'
    })
  },
  globalSetup: './jest-global-setup.js',
  snapshotSerializers: ['enzyme-to-json/serializer'],
  coverageThreshold: {
    global: {
      branches: 66,
      functions: 80,
      lines: 91,
      statements: 90
    }
  }
}
