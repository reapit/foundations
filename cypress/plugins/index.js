const path = require('path')
const wp = require('@cypress/webpack-preprocessor')

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
      }
    }
  }
  on('file:preprocessor', wp(options))


  // Retries plugin
  require('cypress-plugin-retries/lib/plugin')(on)

  // Config ENV
  require('dotenv').config({ path: path.resolve(__dirname, '../../src/constants/.env') })
  const baseUrl = process.env.APPLICATION_URL
  return { ...config, baseUrl, env: { ...process.env } }
}
