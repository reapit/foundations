const path = require('path')
const { defaults } = require('jest-config')
const { jestGlobalConfig } = require('./jest.config')

const jestNodeGlobalConfig = {
  ...this.jestGlobalConfig,
  testEnvironment: 'node',
}

module.exports = { jestNodeGlobalConfig }
