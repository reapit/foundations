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
const WorkboxWebpackPlugin = require('workbox-webpack-plugin')

const EXCLUDE_PACKAGES = ['linaria']

const generateRegexExcludePackages = () => {
  const listPackagesString = EXCLUDE_PACKAGES.join('|')
  return new RegExp(`node_modules/(?!(${listPackagesString})/).*`)
}

const tagName = getVersionTag()
const hashOfCommit = getRef()
const APP_VERSION = `${tagName.packageName}_${tagName.version}`
const outputFileName = `[name].${hashOfCommit}.js`

const webpackConfigProd = ({ appName }) => {
  const config = {
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
          sourcemap: true,
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
        cache: true,
        inject: true,
        mode: 'webapp',
        devMode: 'webapp',
        favicons: {
          appName,
          developerName: 'Reapit Ltd',
          background: '#262F69',
          theme_color: '#262F69',
          icons: {
            favicons: true,
            android: true,
            appleIcon: true,
            appleStartup: true,
            coast: false,
            firefox: false,
            opengraph: false,
            twitter: false,
            yandex: false,
            windows: false,
          },
        },
      }),
      new EnvironmentPlugin({
        APP_VERSION: APP_VERSION,
      }),
      new HashedModuleIdsPlugin(),
      new WorkboxWebpackPlugin.GenerateSW({
        clientsClaim: true,
        exclude: [/\.map$/, /manifest\.json$/],
        navigateFallback: '/index.html',
        navigateFallbackDenylist: [
          // Exclude any URLs whose last part seems to be a file extension
          // as they're likely a resource and not a SPA route.
          // URLs containing a "?" character won't be blacklisted as they're likely
          // a route with query params (e.g. auth callbacks).
          new RegExp('/[^/?]+\\.[^/]+$'),
        ],
      }),
    ],
  }

  if (process.env.IS_RELEASE) {
    config.plugins.push(
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

  return config
}

module.exports = { webpackConfigProd }
