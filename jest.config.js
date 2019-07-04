const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig');

module.exports = {
  preset: 'ts-jest',
  testPathIgnorePatterns: ['<rootDir>/src/tests/'],
  setupFiles: ['<rootDir>/src/scripts/jest-setup.js'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '<rootDir>/src/**/*.tsx'],
  coverageDirectory: './src/tests/coverage',
  coveragePathIgnorePatterns: [
    '<rootDir>[/\\\\](node_modules|src/types|src/tests|src/scripts)[/\\\\]',
  ],
  modulePathIgnorePatterns: ['<rootDir>[/\\\\](node_modules)[/\\\\]'],
  moduleNameMapper: {
    '^.+\\.(css|scss)$': '<rootDir>/src/scripts/css-stub.js',
    ...pathsToModuleNameMapper(compilerOptions.paths, {
      prefix: '<rootDir>/',
    })
  }
};
