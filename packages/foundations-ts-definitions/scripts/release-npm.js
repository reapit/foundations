const { execSync } = require('child_process')
const { getVersionTag } = require('@reapit/ts-scripts')
const publishTimeStampTag = require('./publish-time-stamp-tag')
const { FOUNDATIONS_ROOT_FOLDER } = require('./constants')

const releaseProd = async () => {
  const [, , ...args] = process.argv
  const packageName = args[0]
  const { packageName: packageNameOnTag } = getVersionTag()

  if (!packageName) {
    console.error('No package name was specified for your deployment')
    process.exit(1)
  }

  if (packageName === packageNameOnTag) {
    // release npm
    execSync(`cd ${FOUNDATIONS_ROOT_FOLDER} && yarn publish`)
    publishTimeStampTag()
  }
}

releaseProd()
