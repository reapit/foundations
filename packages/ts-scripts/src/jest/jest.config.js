const path = require('path')
const { defaults } = require('jest-config')

const jestGlobalConfig = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['<rootDir>/src/tests/'],
  setupFiles: [path.join(__dirname, './jest-setup')],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '<rootDir>/src/**/*.tsx', '!<rootDir>/src/**/*.worker.ts'],
  coverageDirectory: './src/tests/coverage',
  coveragePathIgnorePatterns: [
    '<rootDir>[/\\\\](node_modules|src/types|src/tests|src/scripts)[/\\\\]',
    'index.tsx',
    '.d.ts',
  ],
  modulePathIgnorePatterns: ['<rootDir>[/\\\\](node_modules)[/\\\\]'],
  moduleNameMapper: {
    '^.+\\.svg$': path.join(__dirname, './svg-transform.js'),
    '@/(.*)': '<rootDir>/src/$1',
    '^.+.(?=.*scss|sass|css|png|jpg|pdf|jpeg).*': path.join(__dirname, './css-stub.js'),
    'swagger-ui-react': path.join(__dirname, './swagger-stub.js'),
  },
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx', 'graphql', 'gql', 'mjs'],
  verbose: false,
  projects: ['<rootDir>/jest.config.js'],
  transform: {
    '\\.(gql|graphql)$': '@graphql-tools/jest-transform',
  },
  reporters: ['default', 'github-actions'],
  globalSetup: path.join(__dirname, './jest-global.js'),
  resolver: path.join(__dirname, './resolver.js'),
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
  coverageReporters: ['json-summary', 'text', 'lcov'],
}

module.exports = { jestGlobalConfig }
