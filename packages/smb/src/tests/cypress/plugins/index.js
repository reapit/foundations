const path = require('path')
const wp = require('@cypress/webpack-preprocessor')
const ResolveTSPathsToWebpackAlias = require('ts-paths-to-webpack-alias')
const tsConfigPath = path.resolve(__dirname, '../../tsconfig.json')

const reapitConfig = require('../../../../reapit-config.json')

module.exports = (on, config) => {
  // https://basarat.gitbooks.io/typescript/docs/testing/cypress.html
  const options = {
    webpackOptions: {
      resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        modules: [
          /* assuming that one up is where your node_modules sit,
              relative to the currently executing script
            */
          path.join(__dirname, '../../../../node_modules'),
        ],
      },
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            loader: 'ts-loader',
            options: { transpileOnly: true, configFile: tsConfigPath },
          },
        ],
      },
      plugins: [
        /**
         * This plugin mapped all data in the field named "paths" of tsconfig.json to webpack alias
         */
        new ResolveTSPathsToWebpackAlias({
          tsconfig: tsConfigPath,
        }),
      ],
    },
  }
  on('file:preprocessor', wp(options))

  // Retries plugin
  require('cypress-plugin-retries/lib/plugin')(on)

  // Load ENV from config manager
  const reapitEnv = process.env.REAPIT_ENV || 'LOCAL'

  if (typeof reapitConfig !== 'object') {
    throw new Error("reapit-config.json's content is invalid. Its type should be an object")
  }

  const reapitConfigMatchedEnv = reapitConfig[reapitEnv]
  const isReaptConfigMatchedEnvInvalid = !reapitConfigMatchedEnv && typeof reapitConfigMatchedEnv !== 'object'

  if (isReaptConfigMatchedEnvInvalid) {
    throw new Error(`Config of key '${reapitEnv}' is invalid. Its type should be object`)
  }

  const isApplicationUrlInvalid =
    !reapitConfigMatchedEnv.APPLICATION_URL && typeof reapitConfigMatchedEnv.APPLICATION_URL !== 'string'
  if (isApplicationUrlInvalid) {
    throw new Error(`Value of config key '${reapitEnv}'.'APPLICATION_URL' is invaid. Its type should be string`)
  }

  // key env of the returned object in this func doesn't support nested object
  // reapit-config.json contains nest object. eg: SENTRY_PROJECT_URL
  Object.keys(reapitConfigMatchedEnv).forEach(key => {
    if (typeof reapitConfigMatchedEnv[key] === 'object') {
      delete reapitConfigMatchedEnv[key]
    }
  })

  const baseUrl = reapitConfigMatchedEnv.APPLICATION_URL
  return { ...config, baseUrl, env: reapitConfigMatchedEnv }
}
