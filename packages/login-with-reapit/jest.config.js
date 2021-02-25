const { compilerOptions } = require('./tsconfig')
const { pathsToModuleNameMapper } = require('ts-jest/utils')

module.exports = {
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      tsconfig: {
        ...compilerOptions,
        allowJs: true,
      },
    },
  },
  testPathIgnorePatterns: ['<rootDir>/scripts'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '<rootDir>/src/**/*.svelte'],
  coverageDirectory: './tests/coverage',
  coveragePathIgnorePatterns: [
    '<rootDir>[/\\\\](node_modules|src/types|tests|scripts|tests|src/common/styles/__themes__)[/\\\\]',
    '__stubs__',
    '.d.ts',
  ],
  transformIgnorePatterns: ['node_modules/(?!(svelte-routing|svelte-fa)/)'],
  modulePathIgnorePatterns: ['<rootDir>[/\\\\](node_modules|poc-archive)[/\\\\]'],
  moduleNameMapper: {
    '^.+.(?=.*scss|sass|css|png|jpg).*': '<rootDir>/../../scripts/jest/css-stub.js',
    ...pathsToModuleNameMapper(compilerOptions.paths, {
      prefix: '<rootDir>/',
    }),
  },
  moduleFileExtensions: ['js', 'ts', 'svelte'],
  coverageThreshold: {
    global: {
      branches: 60,
      functions: 90,
      lines: 71,
      statements: 74,
    },
  },
  transform: {
    '^.+\\.svg$': '<rootDir>/../../scripts/jest/svg-transform.js',
    '^.+\\.svelte$': ['svelte-jester', { preprocess: true }],
    '^.+\\.js$': 'ts-jest',
  },
  coverageReporters: ['json-summary', 'text', 'lcov'],
}
