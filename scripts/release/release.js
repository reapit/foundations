const { releaseWebApp, sendMessageToSlack, releaseNpm, releaseServerless } = require('./utils')

const BUCKET_NAMES = {
  production: {
    'smb-onboarder': 'reapit-smb-prod',
    marketplace: 'reapit-app-store-prod',
    'lifetime-legal': 'reapit-lifetime-legal-prod',
    'geo-diary': 'reapit-geo-diary-prod',
    elements: 'reapit-elements-prod',
    'aml-checklist': 'reapit-aml-checklist-prod',
  },
  development: {
    'smb-onboarder': 'reapit-smb-prod',
    marketplace: 'reapit-app-store',
    'lifetime-legal': 'reapit-lifetime-legal-dev',
    'geo-diary': 'reapit-geo-diary-dev',
    elements: 'reapit-elements-dev',
    'demo-site': 'reapit-demo-site',
    'aml-checklist': 'reapit-aml-checklist-dev',
  },
}

const WEB_APPS = [
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
]

const SERVERLESS_APPS = [
  'cognito-custom-mail-lambda',
  'deploy-slack-bot',
  'graphql-server',
  'web-components',
  'web-components-config-server',
]

const NPM_APPS = [
  'cognito-auth',
  'config-manager',
  'elements',
  'foundation-ts-definitions',
  'react-app-scaffolder',
  'web-components',
]

const release = async () => {
  const [, , ...args] = process.argv
  const env = args[0]
  const packageName = args[1]
  const currentTag = args[2]
  const previousTag = args[3]
  /**
   * TODO: Replace
   * bucketName=BUCKET_NAMES && BUCKET_NAMES[env] && BUCKET_NAMES[env][packageName]
   * after test every thing OK
   */
  console.log(BUCKET_NAMES && BUCKET_NAMES[env] && BUCKET_NAMES[env][packageName])
  const bucketName = 'cloud-release-artifact'
  const isValidParams = !!packageName && !!currentTag
  if (!isValidParams) {
    console.error('release params is not valid for packageName or currentTag or previousTag')
    process.exit(1)
  }

  if (NPM_APPS.includes(packageName)) {
    releaseNpm({ tagName: currentTag, packageName })
  }

  if (SERVERLESS_APPS.includes(packageName)) {
    try {
      const isValidParamsServerless = isValidParams && !!previousTag && !!env
      if (!isValidParamsServerless) {
        console.error('release params is not valid for packageName or currentTag or previousTag')
        process.exit(1)
      }
      releaseServerless({ tagName: currentTag, packageName, env })
    } catch (err) {
      await sendMessageToSlack(`Rolling back for serverless \`${packageName}\` with version \`${previousTag}\``)
      releaseServerless({ tagName: previousTag, packageName, env })
      throw new Error(err)
    }
  }

  if (WEB_APPS.includes(packageName)) {
    try {
      const isValidWebApp = isValidParams && !!previousTag && !!env && !!bucketName
      if (!isValidWebApp) {
        console.error('release params is not valid for packageName or currentTag or previousTag')
        process.exit(1)
      }
      releaseWebApp({ tagName: currentTag, bucketName, packageName, env })
    } catch (err) {
      await sendMessageToSlack(`Rolling back for web-app \`${packageName}\` with version \`${previousTag}\``)
      releaseWebApp({ tagName: previousTag, bucketName, packageName, env })
      throw new Error(err)
    }
  }
}

release()
