module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    amd: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'prettier',
    'prettier/@typescript-eslint',
    'prettier/react',
    'prettier/standard',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'prettier', 'react-hooks'],
  ignorePatterns: [
    '__mocks__/',
    'node_modules/',
    'setup-tests.ts',
    'jest.config.js',
    '.prettierrc.js',
    'react-app-scaffolder/',
    'marketplace-api-schema.ts',
    'platform-schema.ts',
  ],
  rules: {
    quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: false }],
    semi: ['error', 'never'],
    'no-unused-vars': ['error', { vars: 'all', args: 'after-used' }],
    '@typescript-eslint/no-unused-vars': [2, { args: 'none' }],
    'prettier/prettier': ['error', {
      'endOfLine': 'auto'
    }],
    'max-len': ['error', { code: 120, ignoreUrls: true }],
    'no-confusing-arrow': ['error', { allowParens: false }],
    'no-mixed-operators': [
      'error',
      {
        groups: [
          ['&', '|', '^', '~', '<<', '>>', '>>>'],
          ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
          ['&&', '||'],
          ['in', 'instanceof'],
        ],
      },
    ],
    'no-tabs': ['error', { allowIndentationTabs: true }],
    'no-unexpected-multiline': 'error',
    // Disabling as conflicts with Prettier
    indent: 0,
    // Disabling as we are validating types with TypeScript not PropTypes
    'react/prop-types': 0,
    "react-hooks/rules-of-hooks": 0,
    "react-hooks/exhaustive-deps": 0,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}
