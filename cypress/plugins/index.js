const path = require('path')
const wp = require('@cypress/webpack-preprocessor')
const ResolveTSPathsToWebpackAlias = require('ts-paths-to-webpack-alias')
const reapitConfig = require('../../reapit-config.json')

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
            path.join(__dirname, '../../node_modules')
          ]
      },
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            loader: 'ts-loader',
            options: { transpileOnly: true }
          }
        ]
      },
      plugins: [
        /**
         * This plugin mapped all data in the field named "paths" of tsconfig.json to webpack alias
         */
        new ResolveTSPathsToWebpackAlias({
          tsconfig: path.resolve(__dirname, '../tsconfig.json')
        }),
      ]
    }
  }
  on('file:preprocessor', wp(options))


  // Retries plugin
  require('cypress-plugin-retries/lib/plugin')(on)
  
  // Config ENV
  require('dotenv').config({ path: path.resolve(__dirname, '../../src/constants/.env') })

    // Load ENV from config manager
  let mergedEnv = process.env
  const reapitEnv = process.env.REAPIT_ENV || 'LOCAL'
  const reapitConfigMatchedEnv = reapitConfig[reapitEnv]
  
  if (config && typeof config === 'object') {
    mergedEnv = {...mergedEnv, ...reapitConfigMatchedEnv}
  }

  const baseUrl = process.env.APPLICATION_URL
  return { ...config, baseUrl, env: {...mergedEnv} }
}
