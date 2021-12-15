const { compilerOptions } = require('./tsconfig')
const { pathsToModuleNameMapper } = require('ts-jest')

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
  coverageDirectory: './src/tests/coverage',
  coveragePathIgnorePatterns: [
    '<rootDir>[/\\\\](node_modules|src/types|tests|scripts|tests|src/common/styles/__themes__)[/\\\\]',
    '__stubs__',
    '.d.ts',
  ],
  transformIgnorePatterns: ['node_modules/(?!(svelte-routing|svelte-fa)/)'],
  modulePathIgnorePatterns: ['<rootDir>[/\\\\](node_modules|poc-archive)[/\\\\]'],
  moduleNameMapper: {
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
    '^.+\\.svelte$': ['svelte-jester', { preprocess: true }],
    '^.+\\.js$': 'ts-jest',
  },
  coverageReporters: ['json-summary', 'text', 'lcov'],
}
