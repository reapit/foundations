const devConfig = require('../../scripts/webpack/webpack.config.dev')
const prodConfig = require('../../scripts/webpack/webpack.config.prod')
const { sassDev, sassProd, graphql } = require('../../scripts/webpack/rules')
const WorkboxWebpackPlugin = require('workbox-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'
const config = isProd ? prodConfig : devConfig
const sassRules = isProd ? sassProd : sassDev

config.module.rules.push(sassRules)
config.module.rules.push(graphql)

if (isProd) {
  config.plugins.push(
    new WorkboxWebpackPlugin.GenerateSW({
      clientsClaim: true,
      exclude: [/\.map$/, /asset-manifest\.json$/],
      navigateFallback: '/index.html',
      navigateFallbackDenylist: [
        // Exclude URLs starting with /_, as they're likely an API call
        new RegExp('^/_'),
        // Exclude any URLs whose last part seems to be a file extension
        // as they're likely a resource and not a SPA route.
        // URLs containing a "?" character won't be blacklisted as they're likely
        // a route with query params (e.g. auth callbacks).
        new RegExp('/[^/?]+\\.[^/]+$'),
      ],
    }),
  )
}

module.exports = config
