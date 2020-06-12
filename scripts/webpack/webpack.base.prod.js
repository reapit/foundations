const HtmlWebpackPlugin = require('html-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ResolveTSPathsToWebpackAlias = require('ts-paths-to-webpack-alias')
const CopyPlugin = require('copy-webpack-plugin')
const path = require('path')
const SentryWebpackPlugin = require('@sentry/webpack-plugin')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const { EnvironmentPlugin, SourceMapDevToolPlugin, HashedModuleIdsPlugin } = require('webpack')
const { PATHS } = require('./constants')
const hashFiles = require('../utils/hash-files')
const { getVersionTag, getRef } = require('../release/utils')
const exludePackages = require('./exclude-packages')()

const tagName = getVersionTag()
const hashOfCommit = getRef()
const APP_VERSION = `${tagName.packageName}_${tagName.version}`
const outputFileName = `[name].${hashOfCommit}.js`

/**
 * https://medium.com/@nekrtemplar/self-destroying-serviceworker-73d62921d717
 * https://github.com/reapit/foundations/issues/1419
 * using this method: https://github.com/NekR/self-destroying-sw
 * To clean up service worker for users who has installed it
 *
 * TODO:
 * remove after users stop experiencing errors which relevant to service worker like this:
 * https://sentry.io/organizations/reapit-ltd/issues/1692085300/?project=1885603&referrer=slack
 */
const serviceWorkerPath = path.resolve(__dirname, './sw.js')

const babelLoaderOptions = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'entry',
        corejs: '3',
        targets: {
          chrome: '58',
          ie: '11',
        },
      },
    ],
    'linaria/babel',
  ],
}

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
    new CopyPlugin([
      {
        from: serviceWorkerPath,
        to: './sw.js',
        force: true,
      },
    ]),
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
    new MiniCssExtractPlugin({
      filename: 'styles.css',
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
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: exludePackages,
        use: {
          loader: 'babel-loader',
          options: babelLoaderOptions,
        },
      },
      {
        test: /.tsx?$/,
        exclude: exludePackages,
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
            options: babelLoaderOptions,
          },
          {
            loader: 'linaria/loader',
            options: {
              sourceMap: process.env.NODE_ENV !== 'production',
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
