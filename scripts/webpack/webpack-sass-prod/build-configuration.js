const webpackBase = require('../webpack.base.prod')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { buildCssFilePath } = require('../build-element-scss')
const { getRef } = require('../../release/utils')
const hashOfCommit = getRef()
const outputCSSFileName = `css/[name].${hashOfCommit}.css`

module.exports = {
  ...{
    ...webpackBase,
    entry: [...webpackBase.entry, buildCssFilePath],
  },
  plugins: [
    ...webpackBase.plugins,
    new MiniCssExtractPlugin({
      filename: outputCSSFileName,
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
