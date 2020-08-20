require('isomorphic-fetch')
const spawn = require('child_process').spawnSync
const execSync = require('child_process').execSync
const path = require('path')

const RELEASE_ARTIFACT_FOLDER_NAME = 'dist'

const removeUnuseChar = value => {
  if (!value) {
    return ''
  }
  return value.replace(/(\r\n\t|\n|\r\t)/gm, '')
}

const runCommand = (cmd, args) => {
  const resultObj = spawn(cmd, args)
  const { stdout, stderr } = resultObj

  if (stderr.length !== 0) {
    console.error(stderr.toString().trim())
    throw new Error(stderr.toString().trim())
  }
  console.info(stdout.toString().trim())
  return stdout.toString().trim()
}

const getRef = () => {
  return runCommand('git', ['rev-parse', '--short', 'HEAD'])
}

const getVersionTag = () => {
  // This one use in case release dev we not create the tag
  const packageFolderName = path.basename(path.dirname(`${process.cwd()}/package.json`))
  try {
    const tagName = process.env.RELEASE_VERSION
    const tagNameArr = removeUnuseChar(tagName).split('_')
    const PACKAGE_NAME_INDEX = 0
    const VERSION_INDEX = 1
    const packageName = tagNameArr[PACKAGE_NAME_INDEX] || packageFolderName
    const version = tagNameArr[VERSION_INDEX] || getRef()
    return { packageName, version }
  } catch (error) {
    console.error(error)
    return { packageName: packageFolderName, version: getRef() }
  }
}

const sendMessageToSlack = async message => {
  console.info(message)
  try {
    const slackHook = process.env.RELEASE_SLACK_WEB_HOOK_URL
    const result = await fetch(slackHook, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: message,
      }),
    })
    console.log('sendMessageToSlack', result.statusText)
    return result
  } catch (err) {
    console.error(err)
    throw new Error(err)
  }
}

const syncFromLocalDistToS3Bucket = ({ bucketName }) => {
  try {
    const distPath = path.resolve(process.cwd(), RELEASE_ARTIFACT_FOLDER_NAME)
    // cp all assert with cache-control 365 days exclude sw.js and index.html
    const copyWithCache = execSync(
      `aws s3 cp ${distPath} s3://${bucketName} --grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers --recursive --exclude "index.html" --exclude "sw.js" --exclude "config.json" --cache-control "no-store"`,
    ).toString()
    console.info(copyWithCache)

    // cp index.html and sw.js with no-cache control
    const copyWithNoCache = execSync(
      `aws s3 cp ${distPath} s3://${bucketName} --grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers --recursive --exclude "*" --include "sw.js" --include "index.html" --include "config.json"`,
    ).toString()
    console.info(copyWithNoCache)
  } catch (err) {
    console.error('deployToS3', err)
    throw new Error(err)
  }
}

const copyConfig = ({ packageName }) => {
  const destinationFolder = `${process.cwd()}/${RELEASE_ARTIFACT_FOLDER_NAME}`
  const configFilePath = `${process.cwd()}/packages/${packageName}/config.json`
  const copyConfigResult = execSync(`cp ${configFilePath} ${destinationFolder}`).toString()
  console.info(copyConfigResult)
}

const releaseWebApp = async ({ tagName, bucketName, packageName, env }) => {
  // This is temporary fix for deployment to new prod and old prod env
  if (env === 'staging') {
    env = 'production'
  }
  try {
    const fileName = `${tagName}.tar.gz`
    await sendMessageToSlack(`Extracting the artifact \`${tagName}\` from \`${fileName}\``)
    const tarDistResult = execSync(`tar -xzvf ${fileName}`).toString()
    console.info(tarDistResult)
    copyConfig({ packageName })
    await sendMessageToSlack(`Deploying for web app \`${packageName}\` with version \`${tagName}\``)
    syncFromLocalDistToS3Bucket({ bucketName })
    await sendMessageToSlack(`Finish the deployment for web app \`${packageName}\` with version \`${tagName}\``)
    await sendMessageToSlack(`Testing cypress for web app \`${packageName}\` with version \`${tagName}\``)
    const cypressTest = execSync(
      `yarn workspace cloud-alert cypress:ci --env ENVIRONMENT=${env},PACKAGE_NAME=${packageName}`,
    ).toString()
    console.log(cypressTest)
    await sendMessageToSlack(`Finish testing cypress for web app \`${packageName}\` with version \`${tagName}\``)
  } catch (err) {
    console.error('releaseWebApp', err)
    throw new Error(err)
  }
}

const releaseServerless = async ({ tagName, packageName, env }) => {
  // This is temporary fix for deployment to new prod and old prod env
  if (env === 'staging') {
    env = 'production'
  }
  try {
    await sendMessageToSlack(`Checking out for \`${packageName}\` with version \`${tagName}\``)
    const checkoutResult = execSync(`git checkout ${tagName}`).toString()
    console.info(checkoutResult)
    await sendMessageToSlack(`Deploying for serverless \`${packageName}\` with version \`${tagName}\``)
    const isReleaseWebComponentPackage = WEB_COMPONENTS_SERVERLESS_APPS.includes(packageName)
    if (isReleaseWebComponentPackage) {
      copyConfig({ packageName: 'web-components' })
      const realeaseResult = execSync(
        `yarn workspace @reapit/web-components release:${env} --name ${packageName}`,
      ).toString()
      console.info(realeaseResult)
      await sendMessageToSlack(`Finish the deploy for serverless \`${packageName}\` with version \`${tagName}\``)
      await sendMessageToSlack(`Testing cypress for serverless \`${packageName}\` with version \`${tagName}\``)
      const cypressTest = execSync(
        `yarn workspace cloud-alert cypress:ci --env ENVIRONMENT=${env},PACKAGE_NAME=${packageName}`,
      ).toString()
      console.log(cypressTest)
      await sendMessageToSlack(`Finish testing cypress for serverless \`${packageName}\` with version \`${tagName}\``)
      return
    }
    copyConfig({ packageName })
    const realeaseResult = execSync(`yarn workspace ${packageName} release:${env}`).toString()
    console.info(realeaseResult)
    await sendMessageToSlack(`Finish the deploy for serverless \`${packageName}\` with version \`${tagName}\``)
    await sendMessageToSlack(`Testing cypress for serverless \`${packageName}\` with version \`${tagName}\``)
    const cypressTest = execSync(
      `yarn workspace cloud-alert cypress:ci --env ENVIRONMENT=${env},PACKAGE_NAME=${packageName}`,
    ).toString()
    console.log(cypressTest)
    await sendMessageToSlack(`Finish testing cypress for serverless \`${packageName}\` with version \`${tagName}\``)
    return
  } catch (err) {
    console.error('releaseServerless', err)
    throw new Error(err)
  }
}

const releaseNpm = async ({ tagName, packageName }) => {
  try {
    await sendMessageToSlack(`Checking out for \`${packageName}\` with version \`${tagName}\``)
    const checkoutResult = execSync(`git checkout ${tagName}`).toString()
    console.info(checkoutResult)
    await sendMessageToSlack(`Releasing for npm \`${packageName}\` with version \`${tagName}\``)
    const setGitHubUseSSHResult = execSync(
      'git config --global url.ssh://git@github.com/.insteadOf https://github.com/',
    ).toString()
    console.info(setGitHubUseSSHResult)
    const setUserEmailResult = execSync(
      `git config --global user.email "${process.env.GITHUB_ACTOR}@email.com"`,
    ).toString()
    console.info(setUserEmailResult)
    const setUserNameResult = execSync(`git config --global user.name "${process.env.GITHUB_ACTOR}"`).toString()
    console.info(setUserNameResult)
    const buildResult = execSync(`yarn workspace ${packageName} build:prod`)
    console.info(buildResult)
    const publishResult = execSync(`yarn workspace ${packageName} publish`).toString()
    console.info(publishResult)
    await sendMessageToSlack(`Finish the release for npm \`${packageName}\` with version \`${tagName}\``)
  } catch (err) {
    console.error('releaseNpm', err)
    throw new Error(err)
  }
}

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

const getCommitLog = ({ currentTag, previousTag, packageName }) => {
  const commitLog = runCommand('git', ['log', `${currentTag}...${previousTag}`, `./packages/${packageName}/.`])
  return commitLog
}

const BUCKET_NAMES = {
  production: {
    'admin-portal': 'cloud-admin-portal-web-app',
    'aml-checklist': 'cloud-aml-checklist-web-app',
    'developer-portal': 'cloud-developer-portal',
    'geo-diary-v2': 'cloud-geo-diary-web-app',
    marketplace: 'cloud-marketplace-web-app',
    'reapit-connect': 'cloud-reapit-connect-web-app',
    'smb-onboarder': 'cloud-smb-onboarder-web-app',
  },
  staging: {
    'admin-portal': 'reapit-admin-portal-prod',
    'developer-portal': 'reapit-developer-portal-prod',
    'aml-checklist': 'reapit-aml-checklist-prod',
    'demo-site': 'reapit-demo-site-prod',
    elements: 'reapit-elements-prod',
    'geo-diary': 'reapit-geo-diary-prod',
    'geo-diary-v2': 'reapit-geo-diary-v2-prod',
    'lifetime-legal': 'reapit-lifetime-legal-prod',
    marketplace: 'reapit-app-store-prod',
    'site-builder': 'reapit-site-builder-prod',
    'smb-onboarder': 'reapit-smb-prod',
    'web-components': 'reapit-web-components-prod',
    'elements-next': 'reapit-elements-next-prod',
    'reapit-connect': 'reapit-reapit-connect-prod',
  },
  development: {
    'admin-portal': 'reapit-admin-portal-dev',
    'developer-portal': 'reapit-developer-portal-dev',
    'aml-checklist': 'reapit-aml-checklist-dev',
    'demo-site': 'reapit-demo-site',
    elements: 'reapit-elements-dev',
    'geo-diary': 'reapit-geo-diary-dev',
    'geo-diary-v2': 'reapit-geo-diary-v2-dev',
    'lifetime-legal': 'reapit-lifetime-legal-dev',
    marketplace: 'reapit-app-store',
    'site-builder': 'reapit-site-builder-dev',
    'smb-onboarder': 'reapit-smb-prod',
    'web-components': 'reapit-web-components',
    'elements-next': 'reapit-elements-next-dev',
    'reapit-connect': 'reapit-reapit-connect-dev',
  },
}

const WEB_APPS = [
  'admin-portal',
  'developer-portal',
  'aml-checklist',
  'demo-site',
  'elements',
  'geo-diary',
  'geo-diary-v2',
  'lifetime-legal',
  'marketplace',
  'site-builder',
  'smb-onboarder',
  'web-components',
  'elements-next',
  'reapit-connect',
]

const WEB_COMPONENTS_SERVERLESS_APPS = ['search-widget', 'appointment-planner-component']

const SERVERLESS_APPS = [
  'cognito-custom-mail-lambda',
  'deploy-slack-bot',
  'graphql-server',
  'web-components-config-server',
  ...WEB_COMPONENTS_SERVERLESS_APPS,
]

const NPM_APPS = [
  'cognito-auth',
  'config-manager',
  'elements',
  'foundations-ts-definitions',
  'react-app-scaffolder',
  'web-components',
  'elements-next',
  'connect-session',
  'cra-template-foundations',
]

module.exports = {
  removeUnuseChar,
  getVersionTag,
  syncFromLocalDistToS3Bucket,
  releaseWebApp,
  releaseServerless,
  releaseNpm,
  runCommand,
  getRef,
  sendMessageToSlack,
  BUCKET_NAMES,
  WEB_APPS,
  SERVERLESS_APPS,
  NPM_APPS,
  formatReleaseNote,
  getCommitLog,
}
