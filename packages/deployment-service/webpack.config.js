const slsw = require('serverless-webpack')
const { webpackConfigNode, PATHS } = require('@reapit/ts-scripts')
const CopyPlugin = require('copy-webpack-plugin')

webpackConfigNode.entry = {
  main: './src/index.ts',
  taskPopulation: './src/functions/pipeline/task-population.ts',
  taskRunner: './src/functions/pipeline/task-runner.ts',
}
webpackConfigNode.optimization.minimize = false //slsw.lib.webpack.isLocal ? false : true

// webpackConfigNode.output = {
//   libraryTarget: 'commonjs',
//   path: `${process.cwd()}/dist`,
//   filename: '[name]/index.js',
// }

webpackConfigNode.plugins.push(new CopyPlugin({ 
  patterns: [
    { from: 'config.json', to: PATHS.output },
    { from: 'public-keys.json', to: PATHS.output },
  ]
}))

module.exports = webpackConfigNode
