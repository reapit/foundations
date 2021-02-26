const { webpackConfigProd } = require('./webpack/webpack.config.prod')
const { webpackConfigDev } = require('./webpack/webpack.config.dev')
const { webpackConfigNode } = require('./webpack/webpack.config.node')
const { getVersionTag, runCommand, getRef } = require('./webpack/utils')
const { sassDev, sassProd, graphql } = require('./webpack/rules')
const { PATHS } = require('./webpack/constants')
const { cssStub } = require('./jest/css-stub')
const { jestGlobalConfig } = require('./jest/jest.config')
const svgTransform = require('./jest/svg-transform')

module.exports = {
  webpackConfigDev,
  webpackConfigProd,
  webpackConfigNode,
  getVersionTag,
  runCommand,
  getRef,
  sassDev,
  sassProd,
  graphql,
  PATHS,
  cssStub,
  svgTransform,
  jestGlobalConfig,
}
