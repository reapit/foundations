const HtmlWebpackPlugin = require('html-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const ResolveTSPathsToWebpackAlias = require('ts-paths-to-webpack-alias')
const CopyPlugin = require('copy-webpack-plugin')
const path = require('path')
const SentryWebpackPlugin = require('@sentry/webpack-plugin')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const OfflinePlugin = require('offline-plugin')
const { EnvironmentPlugin, SourceMapDevToolPlugin, HashedModuleIdsPlugin } = require('webpack')
const { PATHS } = require('./constants')
const hashFiles = require('../utils/hash-files')
const { getVersionTag, getRef } = require('../release/utils')

const tagName = getVersionTag()
const hashOfCommit = getRef()
const APP_VERSION = `${tagName.packageName}_${tagName.version}`
const outputFileName = `[name].${hashOfCommit}.js`

const webpackConfig = {
  mode: 'production',
  bail: true,
  context: process.cwd(),
  entry: ['@babel/polyfill', 'core-js', 'isomorphic-fetch', 'regenerator-runtime/runtime', PATHS.entryWeb],
  output: {
    path: PATHS.output,
    filename: outputFileName,
  },
  plugins: [
    new ResolveTSPathsToWebpackAlias({
      tsconfig: PATHS.tsConfig,
    }),
    new SourceMapDevToolPlugin({
      filename: '[file].map',
    }),
    new CopyPlugin([{ from: 'config.json', to: PATHS.output }]),
    new HtmlWebpackPlugin({
      hash: true,
      inject: true,
      template: PATHS.template,
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
        minifyURLs: true,
      },
    }),
    new FaviconsWebpackPlugin({
      logo: PATHS.logo,
      emitStats: false,
      persistentCache: true,
      inject: true,
      background: '#fff',
      title: 'Reapit',
      icons: {
        android: true,
        appleIcon: true,
        appleStartup: true,
        coast: false,
        favicons: true,
        firefox: true,
        opengraph: false,
        twitter: false,
        yandex: false,
        windows: false,
      },
    }),
    new EnvironmentPlugin({
      APP_VERSION: APP_VERSION,
    }),
    new HashedModuleIdsPlugin(),
    new HardSourceWebpackPlugin({
      // each package has its own .webpack-cache
      cacheDirectory: `${PATHS.cacheWebpackDir}/hard-source/[confighash]`,
      environmentHash: {
        root: path.join(__dirname, '../..'),
        directories: [],
        // use yarn.lock at the root of the monorepo as hash, relative to this file
        files: ['yarn.lock'],
      },
    }),
    new OfflinePlugin({
      autoUpdate: 1000 * 60 * 2,
      ServiceWorker: {
        events: true,
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /.tsx?$/,
        use: [
          {
            loader: 'cache-loader',
            options: {
              // each package has its own .webpack-cache
              cacheDirectory: `${PATHS.cacheWebpackDir}/cache-loader`,
              // use yarn.lock at the root of the monorepo as hash, relative to this file
              cacheIdentifier: hashFiles([path.join(__dirname, '../..', 'yarn.lock')]),
            },
          },
          'thread-loader',
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    useBuiltIns: 'entry',
                    corejs: '3',
                    targets: {
                      esmodules: true,
                      chrome: '58',
                      ie: '11',
                    },
                  },
                ],
              ],
            },
          },
          { loader: 'ts-loader', options: { happyPackMode: true, transpileOnly: true } },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg|png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: '/assets',
            },
          },
        ],
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        use: 'graphql-tag/loader',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': `${PATHS.src}/`,
    },
  },
  optimization: {
    nodeEnv: 'production',
    splitChunks: {
      chunks: 'all',
    },
  },
  stats: {
    cached: false,
    cachedAssets: false,
    chunks: false,
    chunkModules: false,
    chunkOrigins: false,
    modules: false,
  },
}

if (process.env.IS_RELEASE) {
  webpackConfig.plugins.push(
    new SentryWebpackPlugin({
      release: APP_VERSION,
      include: './public/dist/',
      ignore: ['node_modules', 'webpack.config.js'],
      configFile: '.sentryclirc',
      setCommits: {
        repo: 'reapit/foundations',
        auto: true,
      },
    }),
  )
}

module.exports = webpackConfig
