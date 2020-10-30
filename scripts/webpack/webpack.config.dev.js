const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const { EnvironmentPlugin } = require('webpack')
const ResolveTSPathsToWebpackAlias = require('ts-paths-to-webpack-alias')
const { PATHS } = require('./constants')
const { getVersionTag } = require('../release/utils')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const ESLintWebpackPlugin = require('eslint-webpack-plugin')

const ESLintPLugin = new ESLintWebpackPlugin({ extensions: ['js', 'jsx', 'ts', 'tsx', 'svelte'] })

const EXCLUDE_PACKAGES = ['linaria']

const generateRegexExcludePackages = () => {
  const listPackagesString = EXCLUDE_PACKAGES.join('|')
  return new RegExp(`node_modules/(?!(${listPackagesString})/).*`)
}

const tagName = getVersionTag()

const babelLoaderOptions = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'entry',
        corejs: '3',
        targets: '> 0.5%, not IE 11, chrome 79',
      },
    ],
    'linaria/babel',
  ],
}

const webpackConfig = {
  mode: 'development',
  bail: true,
  devtool: 'inline-source-map',
  context: process.cwd(),
  entry: ['@babel/polyfill', 'core-js', 'isomorphic-fetch', 'regenerator-runtime/runtime', PATHS.entryWeb],
  output: {
    pathinfo: false,
    path: PATHS.output,
    filename: '[name].[hash].js',
  },
  plugins: [
    new ResolveTSPathsToWebpackAlias({
      tsconfig: PATHS.tsConfig,
    }),
    new EnvironmentPlugin({
      APP_VERSION: `${tagName.packageName}_${tagName.version}`,
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
    new FriendlyErrorsWebpackPlugin(),
    ESLintPLugin,
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: generateRegexExcludePackages(),
        use: [
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
        ],
      },
      {
        test: /.tsx?$/,
        exclude: generateRegexExcludePackages(),
        use: [
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
          { loader: 'ts-loader' },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(sass|scss)$/,
        oneOf: [
          {
            resourceQuery: /\?mod$/,
            use: [
              {
                loader: 'style-loader',
              },
              {
                loader: 'css-loader',
                options: {
                  modules: {
                    localIdentName: '[name]-[local]-[hash:base64:5]',
                  },
                  localsConvention: 'camelCase',
                },
              },
              'postcss-loader',
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: true,
                  includePaths: ['node_modules'],
                },
              },
            ],
          },
          {
            use: [
              {
                loader: 'style-loader',
              },
              {
                loader: 'css-loader',
              },
              'postcss-loader',
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: true,
                  includePaths: ['node_modules'],
                },
              },
            ],
          },
        ],
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        use: 'graphql-tag/loader',
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg|png|jpg|jpeg|gif|pdf)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.css', '.scss', '.sass'],
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      react: require.resolve('react'),
      'react-dom': require.resolve('react-dom'),
      'react-router': require.resolve('react-router'),
      'react-router-dom': require.resolve('react-router-dom'),
    },
  },
  devServer: {
    contentBase: [path.join(process.cwd(), 'public'), path.join(process.cwd())],
    compress: true,
    clientLogLevel: 'warning',
    historyApiFallback: true,
    hot: true,
    quiet: true,
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
    runtimeChunk: true,
  },
}

module.exports = webpackConfig
