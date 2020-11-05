require('isomorphic-fetch')
const spawnSync = require('child_process').spawnSync
const path = require('path')

const removeUnuseChar = value => {
  if (!value) {
    return ''
  }
  return value.replace(/(\r\n\t|\n|\r\t)/gm, '')
}

const runCommand = (cmd, args) => {
  const resultObj = spawnSync(cmd, args)
  const { stdout, stderr } = resultObj

  if (stderr.length !== 0) {
    console.error(stderr.toString().trim())
    return stderr.toString().trim()
  }
  console.info(stdout.toString().trim())
  return stdout.toString().trim()
}

const getRef = () => {
  return runCommand('git', ['rev-parse', '--short', 'HEAD'])
}

const getVersionTag = () => {
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

const extractTarFile = async ({ tagName, packageName }) => {
  try {
    const fileName = `${tagName}.tar.gz`
    runCommand('tar', [
      '-C',
      `./packages/${packageName}/public`,
      '-xzvf',
      `./packages/${packageName}/public/${fileName}`,
    ])
  } catch (err) {
    console.error('releaseWebApp', err)
    throw new Error(err)
  }
}

const copyConfig = ({ packageName }) => {
  const destinationFolder = `${process.cwd()}/packages/${packageName}/public/dist`
  const configFilePath = `${process.cwd()}/packages/${packageName}/config.json`
  runCommand('cp', [configFilePath, destinationFolder])
}

const runReleaseCommand = async ({ packageName, tagName, env }) => {
  await sendMessageToSlack(`Releasing \`${packageName}\` version \`${tagName}\``)
  runCommand('yarn', ['workspace', packageName, `release:${env}`])
  await sendMessageToSlack(`Finished releasing \`${packageName}\` version \`${tagName}\``)
}

const runTestCypress = async ({ packageName, tagName, env }) => {
  await sendMessageToSlack(`E2E tests running \`${packageName}\` version \`${tagName}\``)
  runCommand('yarn', [
    'workspace',
    'cloud-alert',
    'cypress:ci',
    '--env',
    `ENVIRONMENT=${env === 'prod' ? 'production' : 'development'},PACKAGE_NAME=${packageName}`,
  ])
  await sendMessageToSlack(`Uptime tests passed for \`${packageName}\` version \`${tagName}\``)
}

const releaseWebApp = async ({ tagName, packageName, env }) => {
  try {
    await extractTarFile({ tagName, packageName })
    // Ignore copy config for web-components
    if (packageName === 'web-components') {
      packageName = '@reapit/web-components'
      await runReleaseCommand({ packageName, tagName, env })
      await runTestCypress({ packageName, tagName, env })
      return
    }
    if (packageName === 'elements') {
      packageName = '@reapit/elements'
    }
    await copyConfig({ packageName })
    await runReleaseCommand({ packageName, tagName, env })
    await runTestCypress({ packageName, tagName, env })
  } catch (err) {
    console.error('releaseWebApp', err)
    throw new Error(err)
  }
}

const runReleaseCommandForWebComponents = async ({ packageName, tagName, env }) => {
  await sendMessageToSlack(`Releasing \`${packageName}\` version \`${tagName}\``)
  runCommand('yarn', [
    'workspace',
    '@reapit/web-components',
    `release:serverless:${env === 'prod' ? 'production' : 'development'}`,
    '--name',
    packageName,
  ])
  await sendMessageToSlack(`Finished releasing \`${packageName}\` version \`${tagName}\``)
}

const releaseServerless = async ({ tagName, packageName, env }) => {
  try {
    await sendMessageToSlack(`Checking out \`${packageName}\` version \`${tagName}\``)
    runCommand('git', ['checkout', tagName])
    const isReleaseWebComponentPackage = WEB_COMPONENTS_SERVERLESS_APPS.includes(packageName)
    if (isReleaseWebComponentPackage) {
      await runReleaseCommandForWebComponents({ packageName: packageName, tagName, env })
      await runTestCypress({ packageName, tagName, env })
      return
    }
    await runReleaseCommand({ packageName, tagName, env })
    await runTestCypress({ packageName, tagName, env })
    return
  } catch (err) {
    console.error('releaseServerless', err)
    throw new Error(err)
  }
}

const releaseNpm = async ({ tagName, packageName }) => {
  try {
    await sendMessageToSlack(`Checking out \`${packageName}\` version \`${tagName}\``)
    runCommand('git', ['checkout', tagName])
    await sendMessageToSlack(`Releasing for npm \`${packageName}\` version \`${tagName}\``)
    runCommand('git', ['config', '--global', 'url.ssh://git@github.com/.insteadOf https://github.com/'])
    runCommand('git', ['config', '--global', 'user.email', `"${process.env.GITHUB_ACTOR}@email.com"`]).toString()
    runCommand('git', ['config', ' --global', 'user.name', `"${process.env.GITHUB_ACTOR}"`])
    runCommand('yarn', ['workspace', packageName, 'build:prod'])
    runCommand('yarn', ['workspace', packageName, 'publish'])
    await sendMessageToSlack(`Finished publishing \`${packageName}\` version \`${tagName}\` to NPM`)
  } catch (err) {
    console.error('releaseNpm', err)
    throw new Error(err)
  }
}

const getCommitLog = ({ currentTag, previousTag, packageName }) => {
  const commitLog = runCommand('git', ['log', `${currentTag}...${previousTag}`, `./packages/${packageName}/.`])
  return commitLog
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
  'payments-client',
  'data-warehouse',
]

const WEB_COMPONENTS_SERVERLESS_APPS = ['search-widget', 'appointment-planner-component']

const SERVERLESS_APPS = [
  'cognito-custom-mail-lambda',
  'deploy-slack-bot',
  'graphql-server',
  'web-components-config-server',
  'payments-server',
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
  releaseServerless,
  releaseNpm,
  runCommand,
  getRef,
  sendMessageToSlack,
  WEB_APPS,
  SERVERLESS_APPS,
  NPM_APPS,
  getCommitLog,
  releaseWebApp,
}
