const { EnvironmentPlugin } = require('webpack')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const configEnv = require('../config.json')

module.exports = ({ config }) => {
  // exclude SVG from file laoder so we can use @svgr/webpack instead
  const fileLoaderRule = config.module.rules.find((rule) => rule.test && rule.test.test('.svg'))
  fileLoaderRule.exclude = /\.svg$/

  config.module.rules.push(
    {
      test: /\.(ts|tsx)$/,
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
        { loader: 'ts-loader', options: { happyPackMode: true, transpileOnly: true } },
        require.resolve('react-docgen-typescript-loader'),
      ],
    },
    {
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
    },
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
