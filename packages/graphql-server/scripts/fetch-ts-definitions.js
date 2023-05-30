const { Octokit } = require('@octokit/rest')
const fs = require('fs')

const ITEM_PER_PAGE = 100

const files = [
  { src: 'packages/foundations-ts-definitions/types/index.ts', dest: 'src/types/index.ts' },
  { src: 'packages/foundations-ts-definitions/types/platform-schema.ts', dest: 'src/types/platform-schema.ts' },
]

const fetchTSDefinitions = async () => {
  const latestTag = await fetchLatesTag()
  if (latestTag) {
    const commit = latestTag.commit.sha
    const replaceFileTasks = files.map(file => replaceFile(commit, file.src, file.dest))
    await Promise.all(replaceFileTasks)
  } else {
    console.log('No foundations-ts-definitions tag found')
  }
}

const fetchLatesTag = async () => {
  try {
    const token = process.env.GITHUB_TOKEN
    const octokit = new Octokit({ auth: token })
    let tsdTag
    let page = 1
    while (!tsdTag) {
      const { data } = await octokit.repos.listTags({
        owner: 'reapit',
        repo: 'foundations',
        per_page: ITEM_PER_PAGE,
        page,
      })
      // find first tag start with `foundations-ts-definitions`. If no tag found, fetch next page
      tsdTag = data.find(item => item.name.indexOf('foundations-ts-definitions') >= 0)
      page++
    }

    return tsdTag
  } catch (error) {
    console.error(error)
    return null
  }
}

const replaceFile = async (commit, src, dest) => {
  try {
    const token = process.env.GITHUB_TOKEN
    const octokit = new Octokit({ auth: token })
    const result = await octokit.repos.getContents({
      owner: 'reapit',
      repo: 'foundations',
      path: src,
      ref: commit,
    })
    const content = Buffer.from(result.data.content, 'base64').toString()
    fs.writeFileSync(dest, content, { flag: 'w' }, error => {
      if (error) {
        console.error(`Failed to write type definitions for: ${dest}`)
        throw error
      } else {
        console.log(`Successfully wrote type definitions for: ${dest}`)
      }
    })
  } catch (error) {
    console.error(error)
  }
}

fetchTSDefinitions()
  .catch(error => console.error(error))