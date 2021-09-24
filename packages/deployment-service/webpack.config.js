const { webpackConfigNode, PATHS } = require('@reapit/ts-scripts')
const CopyPlugin = require('copy-webpack-plugin')

console.log('running webpack')

webpackConfigNode.entry = ['./src/index.ts']
webpackConfigNode.optimization.minimize = false //slsw.lib.webpack.isLocal ? false : true

webpackConfigNode.plugins.push(new CopyPlugin({ 
  patterns: [
    { from: 'config.json', to: PATHS.output },
    { from: 'public-keys.json', to: PATHS.output },
  ]
}))

module.exports = webpackConfigNode
