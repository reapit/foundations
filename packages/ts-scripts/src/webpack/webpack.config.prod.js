const HtmlWebpackPlugin = require('html-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ResolveTSPathsToWebpackAlias = require('ts-paths-to-webpack-alias')
const CopyPlugin = require('copy-webpack-plugin')
const SentryWebpackPlugin = require('@sentry/webpack-plugin')
const { EnvironmentPlugin, SourceMapDevToolPlugin, HashedModuleIdsPlugin } = require('webpack')
const { PATHS } = require('./constants')
const { getVersionTag, getRef } = require('./utils')
const { ESBuildPlugin, ESBuildMinifyPlugin } = require('esbuild-loader')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

const EXCLUDE_PACKAGES = ['linaria']

const generateRegexExcludePackages = () => {
  const listPackagesString = EXCLUDE_PACKAGES.join('|')
  return new RegExp(`node_modules/(?!(${listPackagesString})/).*`)
}

const tagName = getVersionTag()
const hashOfCommit = getRef()
const APP_VERSION = `${tagName.packageName}_${tagName.version}`
const outputFileName = `[name].${hashOfCommit}.js`

const webpackConfigProd = {
  mode: 'production',
  bail: true,
  context: process.cwd(),
  entry: ['@babel/polyfill', 'core-js', 'isomorphic-fetch', 'regenerator-runtime/runtime', PATHS.entryWeb],
  output: {
    path: PATHS.output,
    filename: outputFileName,
  },
  optimization: {
    nodeEnv: 'production',
    splitChunks: {
      chunks: 'all',
    },
    minimize: true,
    minimizer: [
      new ESBuildMinifyPlugin({
        target: 'es2019',
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      },
      {
        test: /.tsx?$/,
        exclude: generateRegexExcludePackages(),
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
                    targets: '> 0.5%, not IE 11, chrome 69',
                  },
                ],
                'linaria/babel',
              ],
            },
          },
          {
            loader: 'linaria/loader',
            options: {
              sourceMap: process.env.NODE_ENV !== 'production',
            },
          },
          {
            loader: 'esbuild-loader',
            options: {
              loader: 'tsx',
              target: 'esnext',
            },
          },
        ],
      },
      {
        test: /\.(css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg|png|jpg|jpeg|gif|pdf)$/,
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
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.mjs'],
    alias: {
      '@': `${PATHS.src}/`,
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
  plugins: [
    new ESBuildPlugin(),
    new ForkTsCheckerWebpackPlugin({
      eslint: {
        files: './src/**/*.{ts,tsx,js,jsx}',
      },
    }),
    new ResolveTSPathsToWebpackAlias({
      tsconfig: PATHS.tsConfig,
    }),
    new SourceMapDevToolPlugin({
      filename: '[file].map',
    }),
    new CopyPlugin({ patterns: [{ from: 'config.json', to: PATHS.output }] }),
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
      filename: '[name].[hash].css',
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
  ],
}

if (process.env.IS_RELEASE) {
  webpackConfigProd.plugins.push(
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

module.exports = { webpackConfigProd }
