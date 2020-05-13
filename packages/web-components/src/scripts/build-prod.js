#!/usr/bin/env node
const path = require('path')
const { runCommand } = require('../../../../scripts/release/utils')

const releaseDevThemes = () => {
  try {
    const bucketName = 'reapit-web-components'
    const themesDistPath = path.resolve(__dirname, '../../', 'public', 'themes')
    // Copy new version to the bucket
    runCommand('aws', [
      's3',
      'cp',
      themesDistPath,
      `s3://${bucketName}`,
      '--grants',
      'read=uri=http://acs.amazonaws.com/groups/global/AllUsers',
      '--recursive',
    ])
  } catch (err) {
    console.error(err)
    throw new Error(err)
  }
}

return (() => {
  const { execSync } = require('child_process')
  const { setEnv } = require('./get-env')
  const packages = ['search-widget', 'property-detail', 'appointment-bookings', 'viewing-booking', 'themes']
  const opts = {
    stdio: 'inherit',
  }
  setEnv()

  const clearPublic = 'rimraf ./public/dist && rimraf ./public/themes'
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
  // upload themes to CDN
  releaseDevThemes()

  process.exit(0)
})()
