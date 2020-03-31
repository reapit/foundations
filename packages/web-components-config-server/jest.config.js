const baseConfig = require('../../scripts/jest/jest.config')

module.exports = {
  ...baseConfig,
  testPathIgnorePatterns: ['<rootDir>/src/tests/'],
  coveragePathIgnorePatterns: [
    '<rootDir>[/\\\\](node_modules|src/types|src/tests|src/scripts|dist)[/\\\\]',
    'api.ts',
    '.d.ts',
    'index.ts',
  ],
  moduleNameMapper: {
    "^@[/](.+)": "<rootDir>/src/$1",
  },
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
}
