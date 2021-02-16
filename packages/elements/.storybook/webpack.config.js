const { EnvironmentPlugin } = require('webpack')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const configEnv = require('../config.json')
const { getVersionTag } = require('../../../scripts/webpack/utils')

module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.scss$/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
        options: {
          hmr: process.env.NODE_ENV !== 'production',
        },
      },
      {
        loader: 'css-loader',
        options: {
          sourceMap: process.env.NODE_ENV !== 'production',
        },
      },
      'sass-loader',
    ],
    include: path.resolve(__dirname, '../'),
  })
  config.resolve.alias = {
    '@': `${process.cwd()}/src/`,
  }
  config.plugins.push(
    new EnvironmentPlugin({
      ...configEnv,
      APP_VERSION: `${getVersionTag().version}`,
    }),
  )
  config.plugins.push(
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    }),
  )
  return config
}
