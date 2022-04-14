const path = require('path')
const { defaults } = require('jest-config')

const jestGlobalConfig = {
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
    '@/(.*)': '<rootDir>/src/$1',
    '^.+.(?=.*scss|sass|css|png|jpg|pdf|jpeg).*': path.join(__dirname, './css-stub.js'),
    'swagger-ui-react': path.join(__dirname, './swagger-stub.js'),
  },
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx', 'graphql', 'gql'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  verbose: false,
  projects: ['<rootDir>/jest.config.js'],
  transform: {
    '\\.[jt]sx?$': 'babel-jest',
    '^.+\\.svg$': path.join(__dirname, './svg-transform.js'),
    '\\.(gql|graphql)$': 'jest-transform-graphql',
  },
  globalSetup: path.join(__dirname, './jest-global.js'),
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
