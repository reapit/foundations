module.exports = {
  preset: 'ts-jest',
  setupFiles: ['<rootDir>/src/scripts/jest-setup.js'],
  testPathIgnorePatterns: ['<rootDir>/src/scripts'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '<rootDir>/src/**/*.svelte'],
  coverageDirectory: './src/tests/coverage',
  coveragePathIgnorePatterns: [
    '<rootDir>[/\\\\](node_modules|src/types|src/tests|src/scripts|src/tests|src/common/styles/__themes__)[/\\\\]',
    '__stubs__',
    '.d.ts',
  ],
  transformIgnorePatterns: ['node_modules/(?!(svelte-routing|svelte-fa)/)'],
  modulePathIgnorePatterns: ['<rootDir>[/\\\\](node_modules|poc-archive)[/\\\\]'],
  moduleNameMapper: {
    '^.+.(?=.*scss|sass|css|png|jpg).*': '<rootDir>/../../scripts/jest/css-stub.js',
  },
  moduleFileExtensions: ['js', 'ts', 'svelte'],
  coverageThreshold: {
    global: {
      branches: 75,
      functions: 85,
      lines: 90,
      statements: 90,
    },
  },
  transform: {
    '^.+\\.svg$': '<rootDir>/../../scripts/jest/svg-transform.js',
    '^.+\\.svelte$': 'svelte-jester',
    '^.+\\.js$': 'ts-jest',
  },
  coverageReporters: ['json-summary', 'text', 'lcov'],
  snapshotSerializers: ['jest-emotion'],
}
