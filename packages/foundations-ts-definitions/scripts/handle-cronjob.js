const { runCommand } = require('@reapit/ts-scripts')
const releaseGithub = require('./release-github')

const gitStatus = runCommand('git', ['status', '-s'])

console.log(`Cronjob executed at ${new Date().toDateString()} - ${new Date().toTimeString()}`)

if (!gitStatus) {
  console.log('No changes')
  return
}

// updateNPM()
releaseGithub()
