const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const ResolveTSPathsToWebpackAlias = require('ts-paths-to-webpack-alias')
const { GenerateSW } = require('workbox-webpack-plugin')
const HashedModuleIdsPlugin = require('webpack').HashedModuleIdsPlugin
const { EnvironmentPlugin } = require('webpack')
const SentryWebpackPlugin = require('@sentry/webpack-plugin')
const { PATHS } = require('./constants')
const { getVersionTag } = require('../release/utils')
const config = require(PATHS.config)

module.exports = {
  context: process.cwd(),
  entry: ['@babel/polyfill', 'core-js', 'isomorphic-fetch', PATHS.entryWeb],
  output: {
    path: PATHS.output,
    filename: '[name].[hash].js',
  },
  plugins: [
    new ResolveTSPathsToWebpackAlias({
      tsconfig: PATHS.tsConfig,
    }),
    new ForkTsCheckerWebpackPlugin({
      async: false,
      useTypescriptIncrementalApi: true,
      memoryLimit: 4096,
    }),
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
      ...config[process.env.REAPIT_ENV || 'DEV'],
      APP_VERSION:
        process.env.REAPIT_ENV === 'LOCAL' ? JSON.stringify('LOCAL') : JSON.stringify(getVersionTag().version),
    }),
    new HashedModuleIdsPlugin(),
    new GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
      navigateFallback: '/index.html',
      cacheId: process.cwd(),
      cleanupOutdatedCaches: true,
    }),
    new SentryWebpackPlugin({
      include: '.',
      ignoreFile: '.sentrycliignore',
      ignore: ['node_modules', 'webpack.config.js'],
      configFile: 'sentry.properties',
    }),
  ],
  module: {
    rules: [
      {
        test: /.tsx?$/,
        use: [
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
          { loader: 'ts-loader', options: { transpileOnly: true } },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg|png|jpg|jpeg|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: '/assets',
          },
        },
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
