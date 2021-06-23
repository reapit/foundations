const { jestGlobalConfig } = require('@reapit/ts-scripts')

module.exports = {
  ...jestGlobalConfig,
  testPathIgnorePatterns: ['<rootDir>/src/tests/'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '<rootDir>/src/**/*.tsx'],
  coveragePathIgnorePatterns: [
    '<rootDir>[/\\\\](node_modules|src/types|src/tests|src/contexts|src/scripts|src/helpers|src/styles)[/\\\\]',
    '.stories.tsx',
    'src/index.tsx',
    'index.ts',
    'src/styles',
  ],
  modulePathIgnorePatterns: ['<rootDir>[/\\\\](node_modules|public|dist)[/\\\\]'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': '<rootDir>/src/scripts/style-mock.js',
  },
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
}
