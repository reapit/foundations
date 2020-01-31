#!/usr/bin/env node
const { execSync } = require('child_process')
const { getPreviousTag, editReleaseNote, getVersionTag } = require('./utils')

const releaseServerless = async () => {
  const [, , ...args] = process.argv
  const packageName = args[0]
  const bucketName = args[1]
  const { version, packageName: packageNameOnTag } = getVersionTag()
  if (!packageName) {
    console.error('No package name was specified for your deployment')
    process.exit(1)
  }

  if (!bucketName) {
    console.error('No bucket name was specified for your deployment')
    process.exit(1)
  }

  if (packageName === packageNameOnTag) {
    execSync('cross-env CI=true serverless deploy --stage prod')
    const previousTag = getPreviousTag({ packageName: packageNameOnTag })

    await editReleaseNote({ packageName: packageNameOnTag, version, previousTag })
  }
}

releaseServerless()
