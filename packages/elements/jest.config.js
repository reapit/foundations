const { jestGlobalConfig } = require('@reapit/ts-scripts')
const { join } = require('path')

module.exports = {
  ...jestGlobalConfig,
  testPathIgnorePatterns: ['<rootDir>/src/tests/'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '<rootDir>/src/**/*.tsx'],
  coveragePathIgnorePatterns: [
    '<rootDir>[/\\\\](node_modules|src/types|src/tests|src/contexts|src/scripts|src/storybook|src/styles|src/hooks)[/\\\\]',
    '.stories.tsx',
    'src/index.tsx',
    'index.ts',
    'src/styles',
  ],
  modulePathIgnorePatterns: ['<rootDir>[/\\\\](node_modules|public|dist)[/\\\\]'],
  moduleNameMapper: {
    ...jestGlobalConfig.moduleNameMapper,

    '\\.(css)$': '<rootDir>/src/scripts/style-mock.js',
    '^uuid': join(__dirname, '../..', 'node_modules/uuid/dist/index.js'),
  },
  transform: {
    ...jestGlobalConfig.transform,
    '\\.[jt]sx?$': 'babel-jest',
    // '\\.svg$': 'babel-jest',
  },
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
}
