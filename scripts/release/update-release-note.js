const { formatReleaseNote, getCommitLog, sendMessageToSlack } = require('./utils')
const { Octokit } = require('@octokit/rest')

const updateReleaseNote = async () => {
  const [, , ...args] = process.argv
  const packageName = args[0]
  const currentTag = args[1]
  const previousTag = args[2]
  try {
    const commitLog = getCommitLog({ currentTag, previousTag, packageName })
    const releaseNote = formatReleaseNote({ previousTag, currentTag, commitLog })
    const token = process.env.GH_PAT
    const octokit = new Octokit({ auth: token })
    const currentReleaseTag = await octokit.repos.getReleaseByTag({
      owner: 'reapit',
      repo: 'foundations',
      tag: `${currentTag}`,
    })
    if (currentReleaseTag && currentReleaseTag.data) {
      await octokit.repos.updateRelease({
        owner: 'reapit',
        repo: 'foundations',
        body: releaseNote,
        name: `${currentReleaseTag.data.name}`,
        release_id: currentReleaseTag.data.id,
      })
    }
    await sendMessageToSlack(`Release note for \`${currentTag}\` has been updated`)
  } catch (error) {
    console.error(error)
  }
}

updateReleaseNote()
