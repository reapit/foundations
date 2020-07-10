const path = require('path')
const { defaults } = require('jest-config')
const { pathsToModuleNameMapper } = require('ts-jest/utils')
const { compilerOptions } = require('./tsconfig')

module.exports = {
  preset: 'ts-jest',
  testPathIgnorePatterns: ['<rootDir>/src/tests/'],
  setupFiles: ['<rootDir>/src/scripts/jest/jest-setup.js'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '<rootDir>/src/**/*.tsx'],
  coverageDirectory: './src/tests/coverage',
  coveragePathIgnorePatterns: [
    '<rootDir>[/\\\\](node_modules|src/types|src/tests|src/scripts)[/\\\\]',
    'index.tsx',
    '.d.ts',
  ],
  modulePathIgnorePatterns: ['<rootDir>[/\\\\](node_modules)[/\\\\]'],
  moduleNameMapper: {
    '^.+.(?=.*scss|sass|css|png|jpg|pdf).*': '<rootDir>/src/scripts/jest/css-stub.js',
    ...pathsToModuleNameMapper(compilerOptions.paths, {
      prefix: '<rootDir>/',
    }),
  },
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  verbose: false,
  projects: ['<rootDir>/jest.config.js'],
  transform: {
    '^.+\\.svg$': '<rootDir>/src/scripts/jest/svg-transform.js',
  },
  globalSetup: '<rootDir>/src/scripts/jest/jest-global.js',
  coverageThreshold: {
    global: {
      branches: 65,
      functions: 55,
      lines: 85,
      statements: 85,
    },
  },
  coverageReporters: ['json-summary', 'text', 'lcov'],
  cacheDirectory: path.join(__dirname, '.jest-cache'),
}
