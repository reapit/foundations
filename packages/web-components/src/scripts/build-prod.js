#!/usr/bin/env node
return (() => {
  const { execSync } = require('child_process')
  const { setEnv } = require('./get-env')
  const packages = ['search-widget']
  const opts = {
    stdio: 'inherit',
  }
  setEnv()

  const APP_ENV = process.env.APP_ENV || 'local'
  const serverScript = `serverless webpack --out public/dist --stage ${APP_ENV.toLowerCase()}`

  execSync(serverScript, opts)

  packages.forEach(package => {
    try {
      const clearPublic = 'rimraf ./public/dist'
      const clientScript = `rollup -c './src/scripts/rollup.config.${package}.js'`
      const startDev = `${clearPublic} && ${clientScript}`

      execSync(startDev, opts)
    } catch (err) {
      console.error('Error in dev server', err)
      process.exit(1)
    }
  })
  process.exit(0)
})()
