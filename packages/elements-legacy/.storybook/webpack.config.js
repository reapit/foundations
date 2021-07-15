const { EnvironmentPlugin } = require('webpack')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const configEnv = require('../config.json')

module.exports = ({ config }) => {
  config.module.rules.push(
    {
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: 'babel-loader',
        },
        {
          loader: '@linaria/webpack-loader',
          options: {
            sourceMap: process.env.NODE_ENV !== 'production',
          },
        },
        {
          loader: 'esbuild-loader',
          options: {
            loader: 'tsx',
            target: 'es2015',
          },
        },
        require.resolve('react-docgen-typescript-loader'),
      ],
    },
    {
      test: /\.scss$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
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
    },
  )
  config.resolve.extensions.push('.ts', '.tsx')
  config.resolve.alias = {
    '@': `${process.cwd()}/src/`,
  }
  config.plugins.push(
    new EnvironmentPlugin({
      ...configEnv,
    }),
  )
  config.plugins.push(
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    }),
  )
  config.stats = {
    cached: false,
    cachedAssets: false,
    chunks: false,
    chunkModules: false,
    chunkOrigins: false,
    modules: false,
  }

  return config
}
