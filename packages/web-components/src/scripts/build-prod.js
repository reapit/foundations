#!/usr/bin/env node
return (() => {
  const { execSync } = require('child_process')
  const { setEnv } = require('./get-env')
  const packages = ['search-widget']
  const opts = {
    stdio: 'inherit',
  }
  setEnv()

  const clearPublic = 'rimraf ./public/dist'
  execSync(clearPublic, opts)

  packages.forEach(package => {
    try {
      const clientScript = `rollup -c './src/scripts/rollup.config.${package}.js'`
      execSync(clientScript, opts)
    } catch (err) {
      console.error('Error in dev server', err)
      process.exit(1)
    }
  })
  process.exit(0)
})()
