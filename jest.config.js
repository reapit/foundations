module.exports = {
  preset: 'ts-jest',
  testPathIgnorePatterns: ['<rootDir>/src/tests/'],
  setupFiles: ['<rootDir>/src/scripts/jest-setup.js'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '<rootDir>/src/**/*.tsx'],
  coveragePathIgnorePatterns: [
    '<rootDir>[/\\\\](node_modules|src/types|src/tests|src/scripts|src/helpers|src/stylesq)[/\\\\]',
    '.stories.tsx',
    'src/index.tsx'
  ],
  modulePathIgnorePatterns: ['<rootDir>[/\\\\](node_modules|public)[/\\\\]'],
  transform: {
    '^.+\\.svg$': '<rootDir>/src/scripts/svg-transform.js'
  },
  snapshotSerializers: ['enzyme-to-json/serializer'],
  moduleNameMapper: {
    '\\.(css|less)$': '<rootDir>/src/scripts/style-mock.js'
  },
  coverageThreshold: {
    global: {
      branches: 74,
      functions: 90,
      lines: 90,
      statements: 90
    }
  }
}
