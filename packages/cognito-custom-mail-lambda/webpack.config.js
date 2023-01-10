const slsw = require('serverless-webpack')
const { webpackConfigNode } = require('@reapit/ts-scripts')

webpackConfigNode.entry = slsw.lib.entries
webpackConfigNode.optimization.minimize = slsw.lib.webpack.isLocal ? false : true

webpackConfigNode.module.rules = [
  ...webpackConfigNode.module.rules,
  {
    test: /\.html$/i,
    loader: "html-loader",
  },
]
webpackConfigNode.resolve = {
  ...webpackConfigNode.resolve,
  extensions: [
    ...webpackConfigNode.resolve.extensions,
    'html',
  ],
}

module.exports = webpackConfigNode
