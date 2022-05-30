/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  modulePathIgnorePatterns: ['<rootDir>[/\\\\](node_modules|dist)[/\\\\]'],
  coveragePathIgnorePatterns: [
    '<rootDir>[/\\\\](node_modules|src/types|src/tests|src/scripts)[/\\\\]',
    'index.tsx',
    '.d.ts',
  ],
}
