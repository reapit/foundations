const { compilerOptions } = require('./tsconfig')
const { pathsToModuleNameMapper } = require('ts-jest')

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['<rootDir>/dist'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageDirectory: './src/tests/coverage',
  coveragePathIgnorePatterns: [
    '<rootDir>[/\\\\](node_modules|src/types|src/tests|src/scripts)[/\\\\]',
    '.d.ts',
    'src/http.ts',
    'src/sqs.ts',
    'src/sns.ts',
    'src/local-http.ts',
    'src/migration-run.ts',
  ],
  reporters: ['default', 'github-actions'],
  coverageThreshold: {
    global: {
      branches: 41,
      functions: 38,
      lines: 60,
      statements: 40,
    },
  },
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths, {
      prefix: '<rootDir>/',
    }),
  },
}
