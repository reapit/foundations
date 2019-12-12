const merge = require('webpack-merge')
const commonWebpackConfigs = require('./webpack.config')
const path = require('path')

module.exports = merge(commonWebpackConfigs, {
  entry: path.resolve(__dirname, '../src/index.ts'),
  output: {
    path: path.resolve(__dirname, '../dist-npm'),
    filename: "index.js",
    libraryTarget: 'commonjs2'
  },
  externals: {
    react: ['react'],
    'react-dom': [ 'react-dom' ]
  }
})