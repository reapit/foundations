const path = require('path')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const Dotenv = require('dotenv-webpack')
const ResolveTSPathsToWebpackAlias = require('ts-paths-to-webpack-alias')
const HashedModuleIdsPlugin = require('webpack').HashedModuleIdsPlugin

module.exports = {
  context: process.cwd(),
  entry: './src/core/index.tsx',
  output: {
    path: path.join(process.cwd(), 'public', 'dist'),
    filename: '[name].[hash].js'
  },
  plugins: [
    new ResolveTSPathsToWebpackAlias({
      tsconfig: path.resolve(__dirname, '../..', 'tsconfig.json')
    }),
    new ForkTsCheckerWebpackPlugin({
      async: false,
      useTypescriptIncrementalApi: true,
      memoryLimit: 4096
    }),
    new HtmlWebpackPlugin({
      hash: true,
      inject: true,
      template: 'public/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    new BundleAnalyzerPlugin({
      generateStatsFile: true,
      analyzerMode: 'disabled',
      generateStatsFile: true
    }),
    new Dotenv({
      path: './src/constants/.env'
    }),
    new HashedModuleIdsPlugin()
  ],
  module: {
    rules: [
      {
        test: /.tsx?$/,
        use: [{ loader: 'ts-loader', options: { transpileOnly: true } }]
      }
    ]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/')
    },
    extensions: ['.tsx', '.ts', '.js']
  },
  optimization: {
    nodeEnv: 'production',
    splitChunks: {
      chunks: 'all'
    }
  }
}
