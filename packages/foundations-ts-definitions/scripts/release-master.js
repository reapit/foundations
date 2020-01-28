const Octokit = require('@octokit/rest')
const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')
const { GITHUB_TOKEN } = process.env

module.exports = async () => {
  const packageJson = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../package.json')).toString())

  let tagName = 'v' + packageJson.version

  const octokit = new Octokit({
    auth: GITHUB_TOKEN,
  })

  try {
    // https://stackoverflow.com/questions/9110478/how-to-find-the-hash-of-branch-in-git
    const currentHeadSHA = execSync('git rev-parse HEAD')
    const splittedGithubRepositoryParts = process.env.GITHUB_REPOSITORY.split('/')
    const ownerName = splittedGithubRepositoryParts[0]
    const repositoryName = splittedGithubRepositoryParts[1]

    await octokit.git.createRef({
      owner: ownerName,
      repo: repositoryName,
      ref: 'refs/tags/' + tagName,
      sha: currentHeadSHA.toString().trim(),
    })

    // create new release based on tag
    await octokit.repos.createRelease({
      owner: ownerName,
      repo: repositoryName,
      tag_name: tagName,
    })
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}
