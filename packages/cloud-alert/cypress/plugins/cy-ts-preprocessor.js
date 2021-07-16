const wp = require('@cypress/webpack-preprocessor')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')

const webpackOptions = {
  resolve: {
    extensions: ['.ts', '.js'],
    fallback: { crypto: require.resolve('crypto-browserify'), path: require.resolve('path-browserify') },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },
    ],
  },
  plugins: [new NodePolyfillPlugin()],
}

const options = {
  webpackOptions,
}

module.exports = wp(options)
