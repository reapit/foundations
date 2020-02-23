// const { pathsToModuleNameMapper } = require('ts-jest/utils')
// const { compilerOptions } = require('./tsconfig')
// const baseConfig = require('../../scripts/jest/jest.config')

// module.exports = {
//   ...baseConfig,
//   testPathIgnorePatterns: ['<rootDir>/src/tests/', '<rootDir>/dist-cdn/', '<rootDir>/dist-npm/'],
//   collectCoverageFrom: ['<rootDir>/src/**/*.ts', '<rootDir>/src/**/*.tsx', 'properties.ts', 'propertyImages.ts'],
//   coveragePathIgnorePatterns: [
//     ...baseConfig.coveragePathIgnorePatterns,
//     '<rootDir>[/\\\\](node_modules|src/types|src/tests|src/scripts|src/helpers|src/stylesq)[/\\\\]',
//     '.stories.tsx',
//     'src/index.tsx',
//   ],
//   modulePathIgnorePatterns: ['<rootDir>[/\\\\](node_modules|public)[/\\\\]'],
//   moduleNameMapper: {
//     ...baseConfig.moduleNameMapper,
//     ...pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
//   },
//   coverageThreshold: {
//     global: {
//       branches: 47,
//       functions: 37,
//       lines: 49,
//       statements: 51,
//     },
//   },
// }

module.exports = {
  preset: 'ts-jest',
  testPathIgnorePatterns: [],
  setupFiles: ['<rootDir>/../../scripts/jest/jest-setup.js'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '<rootDir>/src/**/*.svelte'],
  coverageDirectory: './src/tests/coverage',
  coveragePathIgnorePatterns: ['<rootDir>[/\\\\](node_modules|src/types|src/tests|src/scripts)[/\\\\]'],
  modulePathIgnorePatterns: ['<rootDir>[/\\\\](node_modules|poc-archive)[/\\\\]'],
  moduleNameMapper: {
    '^.+.(?=.*scss|sass|css|png|jpg).*': '<rootDir>/../../scripts/jest/css-stub.js',
  },
  moduleFileExtensions: ['js','ts', 'svelte'],
  // snapshotSerializers: ['enzyme-to-json/serializer'],
  // verbose: false,
  // bail: 1,
  // projects: ['<rootDir>/jest.config.js'],
  // globalSetup: '<rootDir>/../../scripts/jest/jest-global.js',
  // coverageThreshold: {
  //   global: {
  //     branches: 90,
  //     functions: 90,
  //     lines: 90,
  //     statements: 90,
  //   },
  // },
  transform: {
    '^.+\\.svg$': '<rootDir>/../../scripts/jest/svg-transform.js',
    '^.+\\.svelte$': ['svelte-jester', { "preprocess": true }],
  },
  coverageReporters: ['json-summary', 'text', 'lcov'],
}
