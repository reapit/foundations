const baseConfig = require('../../scripts/jest/jest.config')

module.exports = {
  ...baseConfig,
  testPathIgnorePatterns: ['<rootDir>/src/tests/'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '<rootDir>/src/**/*.tsx'],
  coveragePathIgnorePatterns: [
    '<rootDir>[/\\\\](node_modules|src/types|src/tests|src/scripts|src/helpers|src/styles|src/utils)[/\\\\]',
    '__styles__',
    'src/index.tsx',
    'index.ts'
  ],
  modulePathIgnorePatterns: ['<rootDir>[/\\\\](node_modules|public|dist)[/\\\\]'],
  transform: {
    '^.+\\.svg$': '<rootDir>/src/scripts/svg-transform.js'
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': '<rootDir>/src/scripts/style-mock.js'
  },
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90
    }
  }
}
