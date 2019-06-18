const path = require('path')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  context: process.cwd(),
  entry: {
    main: ['./src/core/index.tsx']
  },
  output: {
    path: path.join(process.cwd(), 'public', 'dist'),
    filename: '[name].js'
  },
  plugins: [
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
    })
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
    extensions: ['.tsx', '.ts', '.js']
  },
  optimization: {
    nodeEnv: 'production',
    splitChunks: {
      chunks: 'all',
      minChunks: 2,
      cacheGroups: {
        default: {
          minChunks: 2,
          reuseExistingChunk: true
        }
      }
    }
  }
}
