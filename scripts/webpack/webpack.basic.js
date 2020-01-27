// const commonWebpackConfigs = require('./webpack.base.prod')
// const path = require('path')
// const fs = require('fs')

// const cdnPath = `${process.cwd()}/src/cdn`
// const files = fs.readdirSync(cdnPath)
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

// read all files in cdn folder folder
// const entries = files.reduce((entries, file) => {
//   const extName = path.extname(file)
//   const fileWithoutExtName = file.replace(extName, '')

//   // Each file will be webpack entry https://webpack.js.org/concepts/entry-points/ ~ 1 file
//   entries[fileWithoutExtName] = path.resolve(cdnPath, file)
//   return entries
// }, {})

const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
// const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const ResolveTSPathsToWebpackAlias = require('ts-paths-to-webpack-alias')
// const { GenerateSW } = require('workbox-webpack-plugin')
// const HashedModuleIdsPlugin = require('webpack').HashedModuleIdsPlugin
// const { EnvironmentPlugin } = require('webpack')
const { PATHS } = require('./constants')
// const config = require(PATHS.config)

module.exports = {
  // context: process.cwd(),
  // entry: ['@babel/polyfill', 'core-js', 'isomorphic-fetch', ...entries],
  // output: {
  //   path: `${process.cwd()}/dist-cdn`,
  //   libraryTarget: 'umd',
  // },
  mode: 'production',
  plugins: [
    new ResolveTSPathsToWebpackAlias({
      tsconfig: PATHS.tsConfig,
    }),
    new ForkTsCheckerWebpackPlugin({
      async: false,
      useTypescriptIncrementalApi: true,
      memoryLimit: 4096,
    }),
    //   new HtmlWebpackPlugin({
    //     hash: true,
    //     inject: true,
    //     template: PATHS.template,
    //     minify: {
    //       removeComments: true,
    //       collapseWhitespace: true,
    //       removeRedundantAttributes: true,
    //       useShortDoctype: true,
    //       removeEmptyAttributes: true,
    //       removeStyleLinkTypeAttributes: true,
    //       keepClosingSlash: true,
    //       minifyJS: true,
    //       minifyCSS: true,
    //       minifyURLs: true,
    //     },
    //   }),
    //   new FaviconsWebpackPlugin({
    //     logo: PATHS.logo,
    //     emitStats: false,
    //     persistentCache: true,
    //     inject: true,
    //     background: '#fff',
    //     title: 'Reapit',
    //     icons: {
    //       android: true,
    //       appleIcon: true,
    //       appleStartup: true,
    //       coast: false,
    //       favicons: true,
    //       firefox: true,
    //       opengraph: false,
    //       twitter: false,
    //       yandex: false,
    //       windows: false,
    //     },
    //   }),
    //   new EnvironmentPlugin(config[process.env.REAPIT_ENV || 'DEV']),
    //   new HashedModuleIdsPlugin(),
    //   new GenerateSW({
    //     clientsClaim: true,
    //     skipWaiting: true,
    //     navigateFallback: '/index.html',
    //     cacheId: process.cwd(),
    //     cleanupOutdatedCaches: true,
    //   }),
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
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': `${PATHS.src}/`,
    },
    plugins: [
      new TsconfigPathsPlugin({
        configFile: PATHS.tsConfig,
      }),
    ],
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
