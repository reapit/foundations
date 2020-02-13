#!/usr/bin/env node
const { getPreviousTag, editReleaseNote, getVersionTag, runCommand } = require('./utils')

const releaseServerless = async () => {
  const [, , ...args] = process.argv
  const packageName = args[0]
  const { version, packageName: packageNameOnTag } = getVersionTag()
  if (!packageName) {
    console.error('No package name was specified for your deployment')
    process.exit(1)
  }

  if (packageName === packageNameOnTag) {
    runCommand('cross-env', ['CI=true', 'serverless', 'deploy', '--stage', 'prod'])
    const previousTag = getPreviousTag({ packageName: packageNameOnTag })

    await editReleaseNote({ packageName: packageNameOnTag, version, previousTag })
  }
}

releaseServerless()
