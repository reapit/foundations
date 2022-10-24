const { webpackConfigProd, webpackConfigDev } = require('@reapit/ts-scripts')

const isProd = process.env.NODE_ENV === 'production'
const appName = 'Reapit Connect'
const config = isProd ? webpackConfigProd({ appName }) : webpackConfigDev({ appName })

module.exports = config
