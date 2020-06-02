const { sendMessageToSlack, getCommitLog, formatReleaseNote } = require('./utils')

// This function will run to
const generateReleaseNote = async () => {
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

generateReleaseNote()
