import { ESLint } from 'eslint'

const baseEslint = {
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
    'node_modules/',
    'setup-tests.ts',
    'jest.config.js',
    '.prettierrc.js',
    'react-app-scaffolder/',
    'marketplace-api-schema.ts',
    'platform-schema.ts',
    'packages/*/build',
    'packages/*/dist',
    'packages/*/public/dist',
    'chat-bot.js',
  ],
  rules: {
    quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: false }],
    semi: ['error', 'never'],
    '@typescript-eslint/no-unused-vars': [2, { args: 'none' }],
    'no-debugger': 'off',
    'prettier/prettier': [
      'warn',
      {
        endOfLine: 'auto',
      },
    ],
    'max-len': ['error', { code: 120, ignoreUrls: true, ignoreTemplateLiterals: true, ignoreStrings: true }],
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
    'react-hooks/rules-of-hooks': 0,
    'react-hooks/exhaustive-deps': 0,
    'react/display-name': 0,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}

export const slugToCamel = (str) =>
  capitalize(
    str.toLowerCase().replace(/([-_][a-z])/g, (group) => group.toUpperCase().replace('-', '').replace('_', '')),
  )

const capitalize = (s) => s && s[0].toUpperCase() + s.slice(1)

const baseConfig = {
  ...baseEslint,
  extends: baseEslint.extends.filter((extend) => !extend.startsWith('prettier/')),
}

export const lint = async (code: string): Promise<string> => {
  const eslint = new ESLint({
    // @ts-ignore
    baseConfig,
    useEslintrc: false,
    fix: true,
  })
  const fixed = await eslint.lintText(code)
  return fixed[0].output || fixed[0].source || ''
}
