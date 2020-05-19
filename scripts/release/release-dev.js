#!/usr/bin/env node
const path = require('path')
const { runCommand } = require('./utils')
const execSync = require('child_process').execSync

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
    // This command remove the old version file in bucket
    const deleteResult = execSync(`aws s3 rm --recursive s3://${bucketName}`).toString()
    console.info(deleteResult)
    // cp all assert with cache-control 365 days exclude sw.js and index.html
    const copyWithCache = execSync(
      `aws s3 cp ${distPath} s3://${bucketName} --grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers --recursive --exclude "index.html" --exclude "sw.js" --exclude "config.json" --cache-control "max-age=31536000"`,
    ).toString()
    console.info(copyWithCache)
    // cp index.html and sw.js with no-cache control
    const copyWithNoCache = execSync(
      `aws s3 cp ${distPath} s3://${bucketName} --grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers --recursive --exclude "*" --include "sw.js" --include "index.html" --include "config.json"`,
    ).toString()
    console.info(copyWithNoCache)
  } catch (err) {
    console.error(err)
    throw new Error(err)
  }
}

releaseDev()
