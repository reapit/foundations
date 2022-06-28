const { webpackConfigProd, webpackConfigDev, sassProd, sassDev } = require('@reapit/ts-scripts')

const isProd = process.env.NODE_ENV === 'production'
const appName = 'App Builder'
const config = isProd
  ? webpackConfigProd({ appName })
  : {
      ...webpackConfigDev({ appName }),
      devServer: {
        ...webpackConfigDev({ appName }).devServer,
        allowedHosts: 'all',
        server: {
          ...(webpackConfigDev({ appName }).devServer.server || {}),
          type: 'https',
        },
      },
    }
const sassRules = isProd ? sassProd : sassDev

config.module.rules.push(sassRules)

module.exports = config
