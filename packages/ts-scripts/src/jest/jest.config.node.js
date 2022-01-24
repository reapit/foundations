const path = require('path')
const { defaults } = require('jest-config')
const { jestGlobalConfig } = require('./jest.config')

const jestNodeGlobalConfig = {
  ...jestGlobalConfig,
  testEnvironment: 'node',
}

module.exports = { jestNodeGlobalConfig }
