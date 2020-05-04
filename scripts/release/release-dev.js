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
    // This command remove the old version file in bucket
    runCommand('aws', ['s3', 'rm', '--recursive', `s3://${bucketName}`])
    // Remove source map files
    runCommand('rimraf', [`${distPath}/**/*.map`])
    // Copy new version to the bucket
    runCommand('aws', [
      's3',
      'cp',
      distPath,
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

releaseDev()
