#!/usr/bin/env node
const path = require('path')
const { runCommand } = require('./utils')

const releaseDev = () => {
  try {
    const [, , ...args] = process.argv
    const packageName = args[0]
    const bucketName = args[1]

    if (!packageName) {
      console.error('No package name was specified for your deployment')
      process.exit(1)
    }

    if (!bucketName) {
      console.error('No bucket name was specified for your deployment')
      process.exit(1)
    }

    const distPath = path.resolve(__dirname, '../../', 'packages', packageName, 'public', 'dist')
    runCommand('rimraf', [`${distPath}/**/*.map`])
    // Sync new version to the bucket
    runCommand('aws', [
      's3',
      'sync',
      distPath,
      `s3://${bucketName}`,
      '--grants',
      'read=uri=http://acs.amazonaws.com/groups/global/AllUsers',
      '--cache-control',
      'max-age=31536000',
    ])
  } catch (err) {
    console.error(err)
    throw new Error(err)
  }
}

releaseDev()
