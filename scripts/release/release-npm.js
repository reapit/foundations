#!/usr/bin/env node
const { getPreviousTag, editReleaseNote, getVersionTag, runCommand, getRef } = require('./utils')
const execSync = require('child_process').execSync

const releaseNpm = async () => {
  runCommand('git', ['checkout', getRef()])
  const [, , ...args] = process.argv
  const packageName = args[0]
  const { version, packageName: packageNameOnTag } = getVersionTag()

  if (!packageName) {
    console.error('No package name was specified for your deployment')
    process.exit(1)
  }

  if (packageName === packageNameOnTag) {
    execSync('git config --global url.ssh://git@github.com/.insteadOf https://github.com/')
    execSync(`git config --global user.email "${process.env.GITHUB_ACTOR}@email.com"`)
    execSync(`git config --global user.name "${process.env.GITHUB_ACTOR}"`)
    runCommand('yarn', ['publish'])
    const previousTag = getPreviousTag({ packageName: packageNameOnTag })
    if (packageName === 'elements') {
      runCommand('gh-pages', ['-d', 'out'])
    }

    await editReleaseNote({ packageName: packageNameOnTag, version, previousTag })
  }
}

releaseNpm()
