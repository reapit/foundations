const { jestGlobalConfig } = require('./jest.config')

const jestNodeGlobalConfig = {
  ...jestGlobalConfig,
  testEnvironment: 'node',
}

module.exports = { jestNodeGlobalConfig }
