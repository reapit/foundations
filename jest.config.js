module.exports = {
  preset: 'ts-jest',
  testPathIgnorePatterns: ['<rootDir>/src/tests/'],
  setupFiles: ['<rootDir>/src/scripts/jest-setup.js'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '<rootDir>/src/**/*.tsx'],
  coveragePathIgnorePatterns: [
    '<rootDir>[/\\\\](node_modules|src/types|src/tests|src/scripts|)[/\\\\]', '.stories.tsx', 'src/index.tsx'
  ],
  modulePathIgnorePatterns: ['<rootDir>[/\\\\](node_modules|public)[/\\\\]'],
  transform: {
    "^.+\\.svg$": "<rootDir>/src/scripts/svg-transform.js"
 }
};
