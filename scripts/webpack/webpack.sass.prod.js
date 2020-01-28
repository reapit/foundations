const webpackBase = require('./webpack.base.prod')
// const path = require('path')
// const glob = require('glob')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const PurgecssWhitelister = require('purgecss-whitelister')
// const { PATHS } = require('./purgecss-loader')
// TODO: #102 Had to comment out as could not find a way to purge
// raw sass from elements project
// const PurgecssLoader = {
//   loader: './purgecss-loader.js',
//   options: {
//     paths: glob.sync(`${PATHS.src}/**/*.{ts,tsx}`),
//     whitelistPatterns: [/^(slick)/, /^(modal)/],
//     whitelist: PurgecssWhitelister([
//       // Insert glob to purge Elements CSS here
//     ]),
//   },
// }

module.exports = {
  ...webpackBase,
  plugins: [
    ...webpackBase.plugins,
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash].css',
    }),
  ],
  module: {
    rules: [
      ...webpackBase.module.rules,
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
        ],
      },
      {
        test: /\.(sass|scss)$/,
        oneOf: [
          {
            resourceQuery: /\?mod$/,
            use: [
              MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 1,
                  modules: {
                    localIdentName: '[hash:base64:5]',
                  },
                  localsConvention: 'camelCase',
                },
              },
              // PurgecssLoader,
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: false,
                },
              },
            ],
          },
          {
            use: [
              MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 1,
                },
              },
              // PurgecssLoader,
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: false,
                },
              },
            ],
          },
        ],
      },
    ],
  },
  resolve: {
    ...webpackBase.module.resolve,
    extensions: [...webpackBase.resolve.extensions, '.css', '.scss', '.sass'],
  },
}
