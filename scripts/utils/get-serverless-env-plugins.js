const { EnvironmentPlugin } = require('webpack')
const SentryWebpackPlugin = require('@sentry/webpack-plugin')
const { getVersionTag } = require('../../scripts/release/utils')

module.exports = () => {
  const tagName = getVersionTag()
  const APP_VERSION = `${tagName.packageName}_${tagName.version}`
  const envPlugins = []
  if (process.env.NODE_ENV !== 'develop') {
    envPlugins.push(
      new EnvironmentPlugin({
        APP_VERSION,
      }),
    )
  }

  if (process.env.IS_RELEASE) {
    const sentryWebpackConfig = {
      release: APP_VERSION,
      include: './dist',
      ignore: ['node_modules', 'webpack.config.js'],
      configFile: '.sentryclirc',
      setCommits: {
        repo: 'reapit/foundations',
        auto: true,
      },
    }
    envPlugins.push(new SentryWebpackPlugin(sentryWebpackConfig))
  }

  return envPlugins
}
