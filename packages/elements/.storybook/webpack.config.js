const { EnvironmentPlugin } = require('webpack')
const path = require('path')
// const configEnv = require('../config.json')
const { getVersionTag } = require('../../../scripts/release/utils')

module.exports = ({ config }) => {
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
            ],
          },
        },
        { loader: 'ts-loader', options: { happyPackMode: true, transpileOnly: true } },
        require.resolve('react-docgen-typescript-loader'),
      ],
    },
    {
      test: /\.stories\.tsx?$/,
      loaders: [
        {
          loader: require.resolve('@storybook/addon-storysource/loader'),
          options: { parser: 'typescript' }
        }
      ],
      enforce: 'pre'
    },
    {
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../')
    }
  )
  config.resolve.extensions.push('.ts', '.tsx')
  config.plugins.push(new EnvironmentPlugin({
    // ...configEnv,
      APP_VERSION: `${getVersionTag().version}`,
  }))
  return config
}
