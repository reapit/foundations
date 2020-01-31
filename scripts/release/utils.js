#!/usr/bin/env node
const { execSync } = require('child_process')
const Octokit = require('@octokit/rest')

export const removeUnuseChar = value => {
  return value.replace(/(\r\n\t|\n|\r\t)/gm, '')
}

export const getVersionTag = () => {
  const tagName = execSync('git describe --tags $(git rev-list --tags --max-count=1)').toString()
  const tagNameArr = removeUnuseChar(tagName).split('_')
  const PACKAGE_NAME_INDEX = 0
  const VERSION_INDEX = 1
  const packageName = tagNameArr[PACKAGE_NAME_INDEX]
  const version = tagNameArr[VERSION_INDEX]
  return {
    packageName,
    version,
  }
}

export const getPreviousTag = ({ packageName }) => {
  const tagName = execSync(`git describe --tags $(git rev-list --tags ) | grep ${packageName}`).toString()
  const tagNameArr = tagName.split('\n')
  const PREVIOUS_TAG_INDEX = 1
  return tagNameArr[PREVIOUS_TAG_INDEX]
}

export const formatReleaseNote = ({ previousTag, packageName, version, commitLog }) => {
  let releaseNote = `
    Release: ${packageName}_${version}
    Rollback: ${previousTag}
    Changes:
    commit | author | description
  `
  const commitLogArr = commitLog.split('\n')
  for (let i = 0; i < commitLogArr.length; i += 6) {
    const COMMIT_INDEX = i
    const COMMIT_AUTHOR_INDEX = i + 1
    const COMMIT_MESSAGE_INDEX = i + 4
    releaseNote = releaseNote.concat(`
      ${commitLogArr[COMMIT_INDEX].replace('commit ', '')} | ${commitLogArr[COMMIT_AUTHOR_INDEX].replace(
      'Author: ',
      '',
    )} | ${commitLogArr[COMMIT_MESSAGE_INDEX]}
    `)
  }

  releaseNote = releaseNote.concat(`
    approver: @Will McVay
    monitor: https://sentry.io/organizations/reapit-ltd/projects/
  `)
  return releaseNote
}

export const editReleaseNote = async ({ packageName, version, previousTag }) => {
  const commitLog = execSync(`git log ${packageName}-${version}...${previousTag} -- packages/${packageName}`).toString()
  const token = process.env.GITHUB_TOKEN
  const octokit = new Octokit({ auth: token })
  const latestRelease = await octokit.repos.getReleaseByTag({
    owner: 'reapit',
    repo: 'foundations',
    tag: `${packageName}-${version}`,
  })
  const bodyRelease = formatReleaseNote({ previousTag, version, packageName, commitLog })
  await octokit.repos.updateRelease({
    owner: 'reapit',
    repo: 'foundations',
    body: bodyRelease,
    release_id: latestRelease.id,
  })
}
