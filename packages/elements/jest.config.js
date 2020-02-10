const baseConfig = require('../../scripts/jest/jest.config')

module.exports = {
  ...baseConfig,
  testPathIgnorePatterns: ['<rootDir>/src/tests/'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '<rootDir>/src/**/*.tsx'],
  coveragePathIgnorePatterns: [
    '<rootDir>[/\\\\](node_modules|src/types|src/tests|src/scripts|src/helpers|src/stylesq)[/\\\\]',
    '.stories.tsx',
    'src/index.tsx',
    'index.ts',
    'v2.ts'
  ],
  modulePathIgnorePatterns: ['<rootDir>[/\\\\](node_modules|public|dist)[/\\\\]'],
  transform: {
    '^.+\\.svg$': '<rootDir>/src/scripts/svg-transform.js'
  },
  moduleNameMapper: {
    '\\.(css|less)$': '<rootDir>/src/scripts/style-mock.js'
  },
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 92,
      lines: 93,
      statements: 93
    }
  }
}
