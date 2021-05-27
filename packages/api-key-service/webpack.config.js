const slsw = require('serverless-webpack')
const { webpackConfigNode, PATHS } = require('@reapit/ts-scripts')
const CopyPlugin = require('copy-webpack-plugin')

webpackConfigNode.entry = slsw.lib.entries
webpackConfigNode.optimization.minimize = slsw.lib.webpack.isLocal ? false : true

webpackConfigNode.plugins.push(new CopyPlugin({ patterns: [{ from: 'publicKeys.json', to: PATHS.output }] }))

module.exports = webpackConfigNode
