module.exports = {
  preset: 'ts-jest',
  testPathIgnorePatterns: ['<rootDir>/src/scripts'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '<rootDir>/src/**/*.svelte'],
  coverageDirectory: './src/tests/coverage',
  coveragePathIgnorePatterns: ['<rootDir>[/\\\\](node_modules|src/types|src/tests|src/scripts)[/\\\\]'],
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$'],
  modulePathIgnorePatterns: ['<rootDir>[/\\\\](node_modules|poc-archive)[/\\\\]'],
  moduleNameMapper: {
    '^.+.(?=.*scss|sass|css|png|jpg).*': '<rootDir>/../../scripts/jest/css-stub.js',
  },
  moduleFileExtensions: ['js', 'ts', 'svelte'],
  coverageThreshold: {
    global: {
      branches: 75,
      functions: 85,
      lines: 95,
      statements: 95,
    },
  },
  transform: {
    '^.+\\.svg$': '<rootDir>/../../scripts/jest/svg-transform.js',
    '^.+\\.svelte$': 'svelte-jester',
  },
  coverageReporters: ['json-summary', 'text', 'lcov'],
}
