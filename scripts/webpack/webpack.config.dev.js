const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const { EnvironmentPlugin } = require('webpack')
const ResolveTSPathsToWebpackAlias = require('ts-paths-to-webpack-alias')
const { PATHS } = require('./constants')
const { getVersionTag } = require('../release/utils')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const AutoDllPlugin = require('autodll-webpack-plugin')
const { ESBuildPlugin } = require('esbuild-loader')
const EXCLUDE_PACKAGES = ['linaria']

const generateRegexExcludePackages = () => {
  const listPackagesString = EXCLUDE_PACKAGES.join('|')
  return new RegExp(`node_modules/(?!(${listPackagesString})/).*`)
}

const tagName = getVersionTag()

const webpackConfig = {
  mode: 'development',
  bail: true,
  devtool: 'inline-source-map',
  context: process.cwd(),
  entry: [PATHS.entryWeb],
  output: {
    pathinfo: false,
    path: PATHS.output,
    filename: '[name].[hash].js',
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
    new AutoDllPlugin({
      inject: true,
      filename: '[name].dll.js',
      context: process.cwd(),
      entry: {
        vendor: [
          'hardtack',
          'himalaya',
          'jsonwebtoken',
          'linaria',
          'pell',
          'prop-types',
          'papaparse',
          'react',
          'react-dom',
          'file-saver',
          'dayjs',
          'react-ga',
          'react-redux',
          'react-router',
          'react-router-dom',
          'redux',
          'redux-saga',
          'formik',
          'yup',
          'chart.js',
          'diff',
          'react-chartjs-2',
          'react-responsive',
          'swagger-ui-react',
          'lodash.isequal',
          'lodash.orderby',
          'rc-dialog',
          'rc-notification',
          'rc-select',
          'rc-tooltip',
          'react-datasheet',
          'react-datepicker',
          'react-google-map',
          'react-google-maps-loader',
          'react-icons',
          'react-image-crop',
          'react-table',
          'react-to-print',
          'jwk-to-pem',
          'isomorphic-fetch',
          'little-loader',
          'react-infinite-scroll-component',
        ],
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /.tsx?$/,
        exclude: generateRegexExcludePackages(),
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['linaria/babel'],
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
              target: 'es2019',
            },
          },
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
  },
}

module.exports = webpackConfig
