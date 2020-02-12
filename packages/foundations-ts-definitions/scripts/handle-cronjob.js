const { runCommand } = require('../../../scripts/release/utils')
const bumpVersion = require('./bump-version')
const releaseMaster = require('./release-master')
const gitStatus = runCommand('git', ['status', '-s'])

// const { npm_package_version, GITHUB_TOKEN, GITHUB_ACTOR, GITHUB_REPOSITORY } = process.env

console.log(`Cronjob executed at ${new Date().toDateString()} - ${new Date().toTimeString()}`)

if (!gitStatus) {
  console.log('No changes')
  return
}

bumpVersion()
releaseMaster()
