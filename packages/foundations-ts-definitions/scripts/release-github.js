const Octokit = require('@octokit/rest')
const fs = require('fs')
const path = require('path')
const getCurrentTimeStamp = require('./get-current-time-stamp-string')
const { FOUNDATIONS_ROOT_FOLDER } = require('./constants')
const { runCommand } = require('../../../scripts/release/utils')
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
    execSync(`git commit -m "chore: update ts definitions - time stamp: ${getCurrentTimeStamp()}"`)
    execSync(`git push -u sshOrigin ${branchName}`)

    const packageJson = JSON.parse(fs.readFileSync(path.resolve(FOUNDATIONS_ROOT_FOLDER, './package.json')).toString())
    let tagName = `foundations-ts-definitions_v${packageJson.version}`

    execSync(`git tag ${tagName}`)
    execSync(`git push --tags sshOrigin ${branchName}`)

    const octokit = new Octokit({
      auth: GITHUB_TOKEN,
    })
    const splittedGithubRepositoryParts = process.env.GITHUB_REPOSITORY.split('/')
    const ownerName = splittedGithubRepositoryParts[0]
    const repositoryName = splittedGithubRepositoryParts[1]

    await octokit.pulls.create({
      owner: ownerName,
      repo: repositoryName,
      title: branchName,
      head: branchName,
      base: 'master',
    })

    // // create new release based on tag
    await octokit.repos.createRelease({
      owner: ownerName,
      repo: repositoryName,
      tag_name: tagName,
      name: tagName,
      target_commitish: branchName,
    })
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}
