const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const { EnvironmentPlugin } = require('webpack')
const ResolveTSPathsToWebpackAlias = require('ts-paths-to-webpack-alias')
const { PATHS } = require('./constants')
const { getVersionTag } = require('./utils')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const { ESBuildPlugin } = require('esbuild-loader')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const EXCLUDE_PACKAGES = ['linaria']

const generateRegexExcludePackages = () => {
  const listPackagesString = EXCLUDE_PACKAGES.join('|')
  return new RegExp(`node_modules/(?!(${listPackagesString})/).*`)
}

const tagName = getVersionTag()

const webpackConfigDev = ({ appName }) => ({
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
    new ReactRefreshWebpackPlugin(),
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
      cache: true,
      inject: true,
      mode: 'light',
      devMode: 'light',
      favicons: {
        appName,
        developerName: 'Reapit Ltd',
        background: '#262F69',
        theme_color: '#262F69',
        icons: {
          favicons: true,
          android: false,
          appleIcon: false,
          appleStartup: false,
          coast: false,
          firefox: false,
          opengraph: false,
          twitter: false,
          yandex: false,
          windows: false,
        },
      },
    }),
    new FriendlyErrorsWebpackPlugin(),
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
              plugins: [require.resolve('react-refresh/babel')],
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
      // Load SVG Graphics used by Elements v3 and convert to React Components to be imported into the code
      // This allows them to be styled eg add fill and so on
      {
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              icon: true,
            },
          },
        ],
      },
      // SVGs loaded from the assets directory are exported to the dist/assets directory as normal
      // This loader needs to come after the first as otherwise, regular loaded SVGs eg those used
      // in Sass files will be overriden with React Code
      {
        test: /\.(woff(2)?|ttf|eot|png|jpg|jpeg|gif|pdf|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.mjs', '.ts', '.js', '.css', '.scss', '.sass'],
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
})

module.exports = { webpackConfigDev }
