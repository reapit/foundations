const { releaseS3, sendMessageToSlack } = require('./utils')

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

const releaseWebApp = async () => {
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
  const isValidParams = !!packageName && !!currentTag && !!previousTag && !!env && !!bucketName
  if (!isValidParams) {
    console.error('releaseWebApp params is not valid for packageName or currentTag or previousTag')
    process.exit(1)
  }
  try {
    releaseS3({ tagName: currentTag, bucketName, packageName, env })
  } catch (err) {
    await sendMessageToSlack(`Rolling back for \`${packageName}\` with version \`${previousTag}\``)
    releaseS3({ tagName: previousTag, bucketName, packageName, env })
    throw new Error(err)
  }
}

releaseWebApp()
