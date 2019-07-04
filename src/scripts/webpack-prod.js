const path = require('path')
const glob = require('glob')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const Dotenv = require('dotenv-webpack')
const ResolveTSPathsToWebpackAlias = require('ts-paths-to-webpack-alias')
const HashedModuleIdsPlugin = require('webpack').HashedModuleIdsPlugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const PATHS = {
  src: path.join(__dirname, '../..', 'src')
}

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
    new HashedModuleIdsPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].bundle.css'
    })
  ],
  module: {
    rules: [
      {
        test: /.tsx?$/,
        use: [{ loader: 'ts-loader', options: { transpileOnly: true } }]
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true
            }
          },
          {
            loader: '@americanexpress/purgecss-loader',
            options: {
              paths: glob.sync(`${PATHS.src}/**/*.{ts,tsx}`)
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: false
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.css', '.scss', '.sass'],
    alias: {
      '@': path.resolve(__dirname, 'src/')
    }
  },
  optimization: {
    nodeEnv: 'production',
    splitChunks: {
      chunks: 'all'
    }
  }
}
