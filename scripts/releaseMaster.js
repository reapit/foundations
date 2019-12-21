const Octokit = require('@octokit/rest')
const releaseMaster = async () => {
  const {  GITHUB_TOKEN, GITHUB_SHA, npm_package_version} = process.env
  let tagName = 'v' + npm_package_version

  const octokit = new Octokit({
    auth: GITHUB_TOKEN
  })

  try {
    await octokit.git.createRef({
      owner: 'phmngocnghia',
      repo: 'reapit-web-comp',
      ref: 'refs/tags/' + tagName,
      sha: process.env.GITHUB_SHA
    })

    // create new release based on tag
    await octokit.repos.createRelease({
      owner: 'phmngocnghia',
      repo: 'reapit-web-comp',
      tag_name: tagName
    })
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}
releaseMaster()
