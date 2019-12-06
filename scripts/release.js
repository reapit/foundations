const Octokit = require('@octokit/rest')
module.exports = async env => {
  const currentVersion = process.env.npm_package_version
  let tagName = 'v' + currentVersion

  if (env === 'dev') {
    tagName += '-beta'
  }

  const token = process.env.GITHUB_TOKEN

  const octokit = new Octokit({
    auth: token
  })

  await octokit.git
    .createRef({
      owner: 'reapit',
      repo: 'elements',
      ref: 'refs/tags/' + tagName,
      sha: process.env.GITHUB_SHA
    })

  // create new release based on tag
  await octokit.repos
    .createRelease({
      owner: 'reapit',
      repo: 'elements',
      tag_name: tagName
    })
}
