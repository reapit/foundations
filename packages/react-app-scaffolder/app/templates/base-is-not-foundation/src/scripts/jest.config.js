const { compilerOptions } = require('./tsconfig.json.js')

module.exports = {
  preset: 'ts-jest',
  testPathIgnorePatterns: ['<rootDir>/src/tests/'],
  setupFiles: ['<rootDir>/../../scripts/jest/jest-setup.js'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '<rootDir>/src/**/*.tsx'],
  coverageDirectory: './src/tests/coverage',
  coveragePathIgnorePatterns: ['<rootDir>[/\\\\](node_modules|src/types|src/tests|src/scripts)[/\\\\]'],
  modulePathIgnorePatterns: ['<rootDir>[/\\\\](node_modules)[/\\\\]'],
  moduleNameMapper: {
    '^.+.(?=.*scss|sass|css|png|jpg).*': '<rootDir>/../../scripts/jest/css-stub.js',
  },
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  verbose: false,
  bail: 1,
  projects: ['<rootDir>/jest.config.js'],
  transform: {
    '^.+\\.svg$': '<rootDir>/../../scripts/jest/svg-transform.js',
  },
  globalSetup: '<rootDir>/../../scripts/jest/jest-global.js',
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
  coverageReporters: ['json-summary', 'text', 'lcov'],
  moduleNameMapper: {
    '^.+.(?=.*scss|sass|css|jpg).*': '<rootDir>/src/scripts/css-stub.js',
    ...pathsToModuleNameMapper(compilerOptions.paths, {
      prefix: '<rootDir>/',
    }),
  },
}
