/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coveragePathIgnorePatterns: [
    '<rootDir>[/\\\\](node_modules|src/types|src/tests|src/scripts|dist)[/\\\\]',
    'index.tsx',
    '.d.ts',
  ],
}
