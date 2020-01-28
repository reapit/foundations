const Octokit = require('@octokit/rest')
const releaseMaster = async () => {
  const { GITHUB_TOKEN, npm_package_version } = process.env
  let tagName = 'v' + npm_package_version

  const octokit = new Octokit({
    auth: GITHUB_TOKEN,
  })

  try {
    await octokit.git.createRef({
      owner: 'reapit',
      repo: 'web-components',
      ref: 'refs/tags/' + tagName,
      sha: process.env.GITHUB_SHA,
    })

    // create new release based on tag
    await octokit.repos.createRelease({
      owner: 'reapit',
      repo: 'web-components',
      tag_name: tagName,
    })
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}
releaseMaster()
