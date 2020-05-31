const { runCommand, sendMessageToSlack } = require('./utils')

const appendCommitInfo = ({ releaseNote, commitLogArr }) => {
  let newReleaseNote = releaseNote
  const COMMIT_INDEX = 0
  const COMMIT_AUTHOR_INDEX = 1
  newReleaseNote = newReleaseNote.concat(`
- ${commitLogArr[COMMIT_INDEX]} | ${
    commitLogArr[COMMIT_AUTHOR_INDEX]
      ? commitLogArr[COMMIT_AUTHOR_INDEX].replace('Author: ', '')
      : commitLogArr[COMMIT_AUTHOR_INDEX]
  } | `)
  return newReleaseNote
}

const appendCommitMessage = ({ releaseNote, commitLogArr }) => {
  let newReleaseNote = releaseNote
  for (let i = 4; i < commitLogArr.length; i++) {
    newReleaseNote = newReleaseNote.concat(
      `${commitLogArr[i] ? commitLogArr[i].replace('\n').replace(/\s{2,}/g, '') : ''}`,
    )
  }
  return newReleaseNote
}

const formatReleaseNote = ({ previousTag, currentTag, commitLog }) => {
  let releaseNote = `
-----------------------------------------------------------------------------
Release: ${currentTag}
Rollback: ${previousTag}
Changes:
commit | author |description
  `
  const footer = `

approver: @willmcvay
monitor: https://sentry.io/organizations/reapit-ltd/projects/
-----------------------------------------------------------------------------
`
  if (!commitLog) {
    return releaseNote.concat(footer)
  }
  const commitArr = commitLog.split('commit ')
  commitArr.forEach(item => {
    const commitLogArr = item.split('\n')
    if (commitLogArr.length > 1) {
      releaseNote = appendCommitInfo({ releaseNote, commitLogArr })
      releaseNote = appendCommitMessage({ releaseNote, commitLogArr })
    }
  })
  releaseNote = releaseNote.concat(footer)
  return releaseNote
}

// TODO: need to change to mono repo
const getCommitLog = ({ currentTag, previousTag, packageName }) => {
  console.log(packageName)
  const commitLog = runCommand('git', ['log', `${currentTag}...${previousTag}`, `./packages/${packageName}/.`])
  return commitLog
}

const releaseNote = async () => {
  const [, , ...args] = process.argv
  const packageName = args[0]
  const currentTag = args[1]
  const previousTag = args[2]
  const isValidParams = !!packageName && !!currentTag && !!previousTag
  if (!isValidParams) {
    throw new Error('Please run cli as yarn release-note <package_name> <current_tag> <previous_tag>')
  }

  try {
    if (!packageName) {
      console.error('No package name was specified for your deployment')
      process.exit(1)
    }
    // TODO: need to change to mono repo
    const commitLog = getCommitLog({ currentTag, previousTag, packageName })
    const releaseNote = formatReleaseNote({ previousTag, currentTag, commitLog })
    console.log(releaseNote)
    await sendMessageToSlack(`Release note for \`${currentTag}\` compare with \`${previousTag}\`
      \`\`\`
      ${releaseNote}
      \`\`\`
    `)
    return releaseNote
  } catch (err) {
    console.error(err)
    await sendMessageToSlack(
      `Release note for \`${currentTag}\` compare with \`${previousTag}\` has been error \`\`\`${JSON.stringify(
        err,
      )}\`\`\``,
    )
    throw new Error(err)
  }
}

releaseNote()
