const { jestGlobalConfig } = require('@reapit/ts-scripts')

module.exports = {
  ...jestGlobalConfig,
  testPathIgnorePatterns: ['<rootDir>/src/tests/'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '<rootDir>/src/**/*.tsx'],
  coveragePathIgnorePatterns: [
    '<rootDir>[/\\\\](node_modules|src/types|src/tests|src/scripts|src/helpers|src/stylesq)[/\\\\]',
    '.stories.tsx',
    'src/index.tsx',
    'index.ts',
    'src/styles-v3',
  ],
  modulePathIgnorePatterns: ['<rootDir>[/\\\\](node_modules|public|v3|dist)[/\\\\]'],
  transform: {
    '^.+\\.svg$': '<rootDir>/src/scripts/svg-transform.js',
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': '<rootDir>/src/scripts/style-mock.js',
  },
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 92,
      lines: 91,
      statements: 91,
    },
  },
}
