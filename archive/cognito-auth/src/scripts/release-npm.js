const Octokit = require('@octokit/rest')
const releaseMaster = async () => {
  const currentVersion = process.env.npm_package_version
  let tagName = 'v' + currentVersion

  const token = process.env.GITHUB_TOKEN

  const octokit = new Octokit({
    auth: token,
  })

  await octokit.git.createRef({
    owner: 'reapit',
    repo: 'cognitio-auth',
    ref: 'refs/tags/' + tagName,
    sha: process.env.GITHUB_SHA,
  })

  // create new release based on tag
  await octokit.repos.createRelease({
    owner: 'reapit',
    repo: 'cognitio-auth',
    tag_name: tagName,
  })
}
releaseMaster()
