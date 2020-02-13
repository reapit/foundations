#!/usr/bin/env node
const { getPreviousTag, editReleaseNote, getVersionTag, runCommand } = require('./utils')

const releaseNpm = async () => {
  const [, , ...args] = process.argv
  const packageName = args[0]
  const { version, packageName: packageNameOnTag } = getVersionTag()
  if (!packageName) {
    console.error('No package name was specified for your deployment')
    process.exit(1)
  }

  if (packageName === packageNameOnTag) {
    runCommand('npm', ['publish'])
    const previousTag = getPreviousTag({ packageName: packageNameOnTag })
    if (packageName === '@reapit/elements') {
      runCommand('gh-pages', ['-d', 'out'])
    }

    await editReleaseNote({ packageName: packageNameOnTag, version, previousTag })
  }
}

releaseNpm()
