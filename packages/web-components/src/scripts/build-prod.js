#!/usr/bin/env node
return (() => {
  const { execSync } = require('child_process')
  const getEnv = require('./get-env')
  const packages = ['search-widget']
  const opts = {
    stdio: 'inherit',
  }
  getEnv()

  const serverScript = `serverless webpack --out public/dist --stage ${process.env.REAPIT_ENV.toLowerCase()}`

  execSync(serverScript, opts)

  packages.forEach(package => {
    try {
      const clearPublic = 'rimraf ./public/dist'
      const clientScript = `rollup -w -c './src/scripts/rollup.config.${package}.js'`
      const startDev = `${clearPublic} && ${clientScript}`

      execSync(startDev, opts)
    } catch (err) {
      console.error('Error in dev server', err)
      process.exit(1)
    }
  })
  process.exit(0)
})()
