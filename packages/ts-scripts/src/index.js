const { webpackConfigProd } = require('./webpack/webpack.config.prod')
const { webpackConfigDev } = require('./webpack/webpack.config.dev')
const { webpackConfigNode } = require('./webpack/webpack.config.node')
const { getVersionTag, runCommand, getRef } = require('./webpack/utils')
const { graphql } = require('./webpack/rules')
const { PATHS } = require('./webpack/constants')
const cssStub = require('./jest/css-stub')
const { jestGlobalConfig } = require('./jest/jest.config')
const { jestNodeGlobalConfig } = require('./jest/jest.config.node')
const svgTransform = require('./jest/svg-transform')
const baseEslint = require('./eslint/base-eslint')
const baseBabel = require('./babel/base-babel')

module.exports = {
  webpackConfigDev,
  webpackConfigProd,
  webpackConfigNode,
  getVersionTag,
  runCommand,
  getRef,
  graphql,
  PATHS,
  cssStub,
  svgTransform,
  jestGlobalConfig,
  jestNodeGlobalConfig,
  baseEslint,
  baseBabel,
}
