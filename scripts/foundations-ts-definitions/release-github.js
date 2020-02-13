const Octokit = require('@octokit/rest')
const getCurrentTimeStamp = require('./get-current-time-stamp-string')
const fs = require('fs')
const path = require('path')
const { FOUNDATION_ROOT_FOLDER } = require('./constants')
const { GITHUB_TOKEN } = process.env
const { runCommand } = require('../release/utils')
const { execSync } = require('child_process')

module.exports = async () => {
  try {
    runCommand('git', ['remote', 'add', 'sshOrigin', `git@github.com:${process.env.GITHUB_REPOSITORY}.git`])
    runCommand('git', ['config', '--global', 'user.email', '"GithubActions@email.com"'])
    runCommand('git', ['config', '--global', 'user.name', '"Github Actions"'])

    runCommand('git', ['add', '.'])
    /**
     * have to use execSync instead
     * husky is throwing output to stderr
     * even the command runs cool
     */
    execSync(`git commit -m 'chore: update TypeScript definition - time stamp: ${getCurrentTimeStamp()}'`)
    execSync('git push -u sshOrigin HEAD:master')

    const packageJson = JSON.parse(fs.readFileSync(path.resolve(FOUNDATION_ROOT_FOLDER, './package.json')).toString())
    let tagName = `foundations-ts-definitions_v${packageJson.version}`

    execSync(`git tag ${tagName}`)
    execSync('git push --tags sshOrigin HEAD:master')

    const octokit = new Octokit({
      auth: GITHUB_TOKEN,
    })
    const splittedGithubRepositoryParts = process.env.GITHUB_REPOSITORY.split('/')
    const ownerName = splittedGithubRepositoryParts[0]
    const repositoryName = splittedGithubRepositoryParts[1]

    // create new release based on tag
    await octokit.repos.createRelease({
      owner: ownerName,
      repo: repositoryName,
      tag_name: tagName,
      name: tagName,
    })
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}
