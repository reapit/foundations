const { EnvironmentPlugin } = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { getVersionTag } = require('../../../scripts/release/utils')
const configEnv = require('../config.json')

module.exports = {
  stories: [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@whitespace/storybook-addon-html/register"
  ],
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Return the altered config
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          '@': `${process.cwd()}/src/`,
        }
      },
      module: {
        ...config.module,
        rules: [
          ...config.module.rules,
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
          }
        ]
      },
      plugins: [
        ...config.plugins,
        new EnvironmentPlugin({
          ...configEnv,
          APP_VERSION: `${getVersionTag().version}`,
        }),
        new MiniCssExtractPlugin({
          filename: 'styles.css',
        })
      ]
    }
  }
}