const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const path = require('path')
const webpack = require('webpack')

const { PATHS } = require(path.resolve(__dirname, '../../../scripts/webpack/constants'))
const reapitConfig = require(PATHS.config)

module.exports = async ({ config }) => {
  // Map data in reapit-config to process.env
  config.plugins.push(new webpack.EnvironmentPlugin(reapitConfig[process.env.REAPIT_ENV || 'LOCAL']))

  // Configurations copied from elements storybook configurations
  config.module.rules.push(
    {
      test: /\.(ts|tsx)$/,
      use: [require.resolve('awesome-typescript-loader'), require.resolve('react-docgen-typescript-loader')],
    },
    {
      test: /\.stories\.tsx?$/,
      loaders: [
        {
          loader: require.resolve('@storybook/addon-storysource/loader'),
          options: { parser: 'typescript' },
        },
      ],
      enforce: 'pre',
    },
    {
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../'),
    },
  )

  config.resolve.extensions.push('.ts', '.tsx')

  /**
   * This plugin maps all path aliases in tsconfig.json to webpack alias
   */
  config.resolve = {
    ...config.resolve,
    plugins: [
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, '../tsconfig.json'),
      }),
    ],
  }
  return config
}
