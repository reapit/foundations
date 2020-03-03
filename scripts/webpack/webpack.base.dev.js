const path = require('path')
const ForkTsCheckerNotifierWebpackPlugin = require('fork-ts-checker-notifier-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const { EnvironmentPlugin } = require('webpack')
const ResolveTSPathsToWebpackAlias = require('ts-paths-to-webpack-alias')
const { PATHS } = require('./constants')
const { getVersionTag } = require('../release/utils')
const config = require(PATHS.config)
const hashFiles = require('../utils/hash-files')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')

module.exports = {
  mode: 'development',
  context: process.cwd(),
  entry: PATHS.entryWeb,
  output: {
    path: PATHS.output,
    filename: '[name].[hash].js',
  },
  plugins: [
    new ResolveTSPathsToWebpackAlias({
      tsconfig: PATHS.tsConfig,
    }),
    new ForkTsCheckerWebpackPlugin({
      useTypescriptIncrementalApi: true,
    }),
    new ForkTsCheckerNotifierWebpackPlugin({
      title: 'TypeScript',
      excludeWarnings: false,
    }),
    new EnvironmentPlugin({
      ...config[process.env.REAPIT_ENV || 'LOCAL'],
      APP_VERSION:
        process.env.REAPIT_ENV === 'LOCAL' ? JSON.stringify('LOCAL') : JSON.stringify(getVersionTag().version),
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: PATHS.template,
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
          {
            loader: 'ts-loader',
            options: { transpileOnly: true },
          },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg|png|jpg|jpeg|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
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
      '@': path.resolve(__dirname, 'src/'),
      react: require.resolve('react'),
      'react-dom': require.resolve('react-dom'),
      'react-router': require.resolve('react-router'),
      'react-router-dom': require.resolve('react-router-dom'),
    },
  },
  devtool: 'inline-source-map',
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: true,
    stats: {
      cached: false,
      cachedAssets: false,
      chunks: false,
      chunkModules: false,
      chunkOrigins: false,
      modules: false,
    },
  },
  optimization: {
    nodeEnv: 'development',
    splitChunks: {
      chunks: 'all',
    },
  },
}
