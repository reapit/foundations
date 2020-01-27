const { pathsToModuleNameMapper } = require('ts-jest/utils')
const { compilerOptions } = require('./tsconfig')
const baseConfig = require('../../scripts/jest/jest.config')

module.exports = {
  ...baseConfig,
  testPathIgnorePatterns: ['<rootDir>/src/tests/', '<rootDir>/dist-cdn/', '<rootDir>/dist-npm/'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '<rootDir>/src/**/*.tsx', 'properties.ts', 'propertyImages.ts'],
  coveragePathIgnorePatterns: [
    ...baseConfig.coveragePathIgnorePatterns,
    '<rootDir>[/\\\\](node_modules|src/types|src/tests|src/scripts|src/helpers|src/stylesq)[/\\\\]',
    '.stories.tsx',
    'src/index.tsx'
  ],
  modulePathIgnorePatterns: ['<rootDir>[/\\\\](node_modules|public)[/\\\\]'],
  moduleNameMapper: {
    ...baseConfig.moduleNameMapper,
    ...pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' })
  },
  coverageThreshold: {
    global: {
      branches: 47,
      functions: 37,
      lines: 49,
      statements: 51,
    },
  },
}
