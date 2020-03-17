module.exports = {
  preset: 'ts-jest',
  testPathIgnorePatterns: ['<rootDir>/src/scripts'],
  setupFiles: ['<rootDir>/../../scripts/jest/jest-setup.js'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '<rootDir>/src/**/*.svelte'],
  coverageDirectory: './src/tests/coverage',
  coveragePathIgnorePatterns: ['<rootDir>[/\\\\](node_modules|src/types|src/tests|src/scripts)[/\\\\]'],
  modulePathIgnorePatterns: ['<rootDir>[/\\\\](node_modules|poc-archive)[/\\\\]'],
  moduleNameMapper: {
    '^.+.(?=.*scss|sass|css|png|jpg).*': '<rootDir>/../../scripts/jest/css-stub.js',
  },
  moduleFileExtensions: ['js','ts', 'svelte'],
  coverageThreshold: {
    global: {
      branches: 60,
      functions: 70,
      lines: 90,
      statements: 90,
    },
  },
  transform: {
    '^.+\\.svg$': '<rootDir>/../../scripts/jest/svg-transform.js',
    '^.+\\.svelte$': ['svelte-jester', { "preprocess": true }],
  },
  coverageReporters: ['json-summary', 'text', 'lcov'],
}
