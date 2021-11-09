const slsw = require('serverless-webpack')
const { webpackConfigNode } = require('@reapit/ts-scripts')

console.log('sls', slsw.lib.entries)

webpackConfigNode.entry = slsw.lib.entries
webpackConfigNode.optimization.minimize = slsw.lib.webpack.isLocal ? false : true

module.exports = webpackConfigNode
