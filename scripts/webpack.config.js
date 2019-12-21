const webpack = require('webpack')
const path = require('path')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin
const Dotenv = require('dotenv-webpack')

const analyzePlugins = process.env.ANALYZE ? [new BundleAnalyzerPlugin()] : []

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /(node_modules|bower_components|types)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(svg|png|jpg|jpeg|gif)$/,
        include: path.resolve(__dirname, 'src', 'assets'),
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
          }
        }
      }
    ]
  },
  resolve: {
    // since our webpack config store not in the same folde as node module
    modules: [path.resolve(__dirname, '../node_modules')],

    // import without filename
    extensions: ['.js', '.ts', '.tsx'],

    // auto resolve config from typescript
    plugins: [
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, '../tsconfig.json')
      })
    ]
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      tsconfig: path.resolve(__dirname, '../tsconfig.json')
    }),
    new Dotenv(),
    ...analyzePlugins
  ]
}
