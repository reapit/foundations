const { webpackConfigNode } = require('@reapit/ts-scripts')

webpackConfigNode.entry = ['./src/index.ts']
webpackConfigNode.optimization.minimize = true

module.exports = webpackConfigNode
