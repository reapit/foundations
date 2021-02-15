const slsw = require('serverless-webpack')
const config = require('../../scripts/webpack/webpack.config.node')

config.entry = slsw.lib.entries
config.optimization.minimize = slsw.lib.webpack.isLocal ? false : true

module.exports = config
