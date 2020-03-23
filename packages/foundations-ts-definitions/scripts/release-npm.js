const { execSync } = require('child_process')
const { getPreviousTag, editReleaseNote, getVersionTag } = require('../../../scripts/release/utils')
const publishTimeStampTag = require('./publish-time-stamp-tag')
const { FOUNDATION_ROOT_FOLDER } = require('./constants')

const releaseProd = async () => {
  const [, , ...args] = process.argv
  const packageName = args[0]
  const { version, packageName: packageNameOnTag } = getVersionTag()

  if (!packageName) {
    console.error('No package name was specified for your deployment')
    process.exit(1)
  }

  if (packageName === packageNameOnTag) {
    // release npm
    execSync(`cd ${FOUNDATION_ROOT_FOLDER} && yarn publish`)
    publishTimeStampTag()

    const previousTag = getPreviousTag({ packageName: packageNameOnTag })

    await editReleaseNote({ packageName: packageNameOnTag, version, previousTag })
  }
}

releaseProd()
