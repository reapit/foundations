const Octokit = require('@octokit/rest')
const getCurrentTimeStamp = require('./get-current-time-stamp-string')
const { runCommand } = require('../../../scripts/webpack/utils')
const { execSync } = require('child_process')

const { GITHUB_TOKEN } = process.env

module.exports = async () => {
  try {
    const branchName = `chore/ts-definitions-time-stamp-${getCurrentTimeStamp()}`
    runCommand('git', ['remote', 'add', 'sshOrigin', `git@github.com:${process.env.GITHUB_REPOSITORY}.git`])
    runCommand('git', ['config', '--global', 'user.email', '"wmcvay@reapit.com"'])
    runCommand('git', ['config', '--global', 'user.name', '"Will McVay"'])
    /**
     * have to use execSync instead
     * husky is throwing output to stderr
     * even the command runs cool
     */

    execSync(`git checkout -b ${branchName}`)
    runCommand('git', ['add', '.'])
    execSync('git commit -m "chore: update ts definitions"')
    execSync(`git push -u sshOrigin ${branchName} -f`)

    const octokit = new Octokit({
      auth: GITHUB_TOKEN,
    })
    const splittedGithubRepositoryParts = process.env.GITHUB_REPOSITORY.split('/')
    const ownerName = splittedGithubRepositoryParts[0]
    const repositoryName = splittedGithubRepositoryParts[1]

    await octokit.pulls.create({
      owner: ownerName,
      repo: repositoryName,
      title: 'chore: update ts definitions',
      head: branchName,
      base: 'master',
    })
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}
