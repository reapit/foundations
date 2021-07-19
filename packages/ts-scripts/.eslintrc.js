module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    amd: true,
    jest: true,
  },
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
}
