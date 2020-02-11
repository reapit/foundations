const Octokit = require('@octokit/rest')
const getCurrentTimeStamp = require('./get-current-time-stamp-string')
const fs = require('fs')
const path = require('path')
const { FOUNDATION_ROOT_FOLDER } = require('./constants')
const { GITHUB_TOKEN } = process.env
const { runCommand } = require('../release/utils')

module.exports = async () => {
  runCommand('git', ['remote', 'add', 'sshOrigin', `git@github.com:${process.env.GITHUB_REPOSITORY}.git`])
  runCommand('git', ['config', '--global', 'user.email', '"GithubActions@email.com"'])
  runCommand('git', ['config', '--global', 'user.name', '"Github Actions"'])

  runCommand('git', ['add', '.'])
  runCommand('git', ['commit', '-m', `"Update TypeScript definition - time stamp: ${getCurrentTimeStamp()}"`])
  runCommand('yarn', ['publish'])
  runCommand('git', ['push', '-u', 'sshOrigin', 'HEAD:master'])

  const packageJson = JSON.parse(fs.readFileSync(path.resolve(FOUNDATION_ROOT_FOLDER, './package.json')).toString())
  let tagName = `foundations-ts-definitions_v${packageJson.version}`

  runCommand('git', ['tag', tagName]), runCommand('git', ['push', '--tags', 'sshOrigin', 'HEAD:master'])

  const octokit = new Octokit({
    auth: GITHUB_TOKEN,
  })

  try {
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
