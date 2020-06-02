const { Octokit } = require('@octokit/rest')
const dayjs = require('dayjs')
const { execSync } = require('child_process')
const insertAtLine = require('./insert-at-line')
const mapPackageNameToPathLine = require('./map-package-path')

/**
 * Flow:
 * 1. Get currentTag from Github Action
 * 2. Extract packageName from currentTag
 * 3. Get release title, body, date from currentTag using github API
 * 4. Format content
 * 5. Get { path, line } object to .md file based on packageName
 *    (line is where content is inserted, this way, newer release notes always come first)
 * 6. Insert content into line
 * 7. git add -> git commit -> git push (with currentTag as branch name)
 * 8. Create PR using Github API
 */
const getReleaseAndCreatePr = async () => {
  const [, , ...args] = process.argv
  const packageName = args[0]
  const currentTag = args[1]
  try {
    const [owner, repo] = process.env.MAIN_REPO.split('/')
    const [ownerDoc, repoDoc] = process.env.DOC_REPO.split('/')

    const octokit = new Octokit({
      auth: process.env.GH_PAT,
      baseUrl: process.env.API_GITHUB_ENDPOINT,
    })
    const {
      data: { body, published_at: publishedAt },
    } = await octokit.repos.getReleaseByTag({
      owner,
      repo,
      tag: currentTag,
    })

    const formattedContent = `### ${currentTag} - ${dayjs(publishedAt).format('YYYY-MM-DD')}
  ${body}
    `
    const docRepoPath = process.env.DOC_CLONE_PATH
    const inputObj = mapPackageNameToPathLine({ docRepoPath, packageName })
    if (!inputObj) {
      throw 'No package name matched!'
    }
    const { path, line } = inputObj

    const newFilePath = await insertAtLine({ path, line, content: formattedContent })
    const prTitle = `${currentTag} - Document Update`
    console.log('Executing git commands...')
    execSync(
      `cd ${docRepoPath} && \
    git remote set-url origin git@github.com:$DOC_REPO
    git config user.name "Will McVay" && \
    git config user.email "wmcvay@reapit.com" && \
    git checkout -b ${currentTag} && \
    git add ${newFilePath} && \
    git commit -m "${prTitle}" && \
    git push -u origin HEAD
      `,
    )
    console.log(`Pushed to ${currentTag}, creating PR...`)
    const {
      data: { html_url },
    } = await octokit.pulls.create({
      owner: ownerDoc,
      repo: repoDoc,
      title: prTitle,
      head: currentTag,
      base: 'master',
    })
    console.log(`Success! A PR has been created at: ${html_url}`)
    return 'Success'
  } catch (err) {
    console.error('An error happened!')
    throw err
  }
}

getReleaseAndCreatePr()
