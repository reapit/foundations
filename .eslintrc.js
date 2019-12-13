module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    amd: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'prettier',
    'prettier/@typescript-eslint',
    'prettier/react',
    'prettier/standard'
  ],
  globals: {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly'
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      'jsx': true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'prettier',
  ],
  ignorePatterns: ['__mocks__/', 'node_modules/', 'setupTests.ts'],
  rules: {
    'indent': ['error', 2],
    'linebreak-style': ['error', 'unix'],
    'quotes': ['error', 'single', { 'avoidEscape': true, 'allowTemplateLiterals': false }],
    'semi': ['error', 'never'],
    'no-unused-vars': ['error', { 'vars': 'all' }],
    '@typescript-eslint/no-unused-vars': [2, { args: 'none' }],
    'prettier/prettier': 'error',
    'max-len': ['error', {'code': 120, 'ignoreUrls': true}],
    'no-confusing-arrow': ['error', { 'allowParens': false }],
    'no-mixed-operators': 'error',
    'no-tabs': ['error', {'allowIndentationTabs': true}],
    'no-unexpected-multiline': 'error',
  },
  settings: {
    react: {
      version: 'detect'
    },
  },
}
