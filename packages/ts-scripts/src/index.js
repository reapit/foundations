const cssStub = require('./jest/css-stub')
const { jestGlobalConfig } = require('./jest/jest.config')
const { jestNodeGlobalConfig } = require('./jest/jest.config.node')
const svgTransform = require('./jest/svg-transform')
const baseEslint = require('./eslint/base-eslint')
const baseBabel = require('./babel/base-babel')

module.exports = {
  cssStub,
  svgTransform,
  jestGlobalConfig,
  jestNodeGlobalConfig,
  baseEslint,
  baseBabel,
}
