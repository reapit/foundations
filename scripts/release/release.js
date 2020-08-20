const {
  releaseWebApp,
  sendMessageToSlack,
  releaseNpm,
  releaseServerless,
  BUCKET_NAMES,
  SERVERLESS_APPS,
  NPM_APPS,
  WEB_APPS,
} = require('./utils')

const release = async () => {
  const [, , ...args] = process.argv
  const env = args[0]
  const packageName = args[1]
  const currentTag = args[2]
  // Get Bucket name
  const bucketName = BUCKET_NAMES && BUCKET_NAMES[env] && BUCKET_NAMES[env][packageName]
  const isValidParams = !!packageName && !!currentTag
  if (!isValidParams) {
    console.error('release params is not valid for packageName or currentTag or previousTag')
    process.exit(1)
  }

  if (NPM_APPS.includes(packageName) && env === 'production') {
    releaseNpm({ tagName: currentTag, packageName: `@reapit/${packageName}` })
  }

  if (SERVERLESS_APPS.includes(packageName)) {
    try {
      const isValidParamsServerless = isValidParams && !!env
      if (!isValidParamsServerless) {
        console.error('release params is not valid for packageName or currentTag or previousTag')
        process.exit(1)
      }
      releaseServerless({ tagName: currentTag, packageName, env })
    } catch (err) {
      await sendMessageToSlack(`Deploy \`${packageName}\` version \`${currentTag}\` failed`)
      throw new Error(err)
    }
  }

  if (WEB_APPS.includes(packageName)) {
    try {
      const isValidWebApp = isValidParams && !!env && !!bucketName
      if (!isValidWebApp) {
        console.error('release params is not valid for packageName or currentTag or previousTag')
        process.exit(1)
      }
      releaseWebApp({ tagName: currentTag, bucketName, packageName, env })
    } catch (err) {
      await sendMessageToSlack(`Deploy \`${packageName}\` version \`${currentTag}\` failed`)
      throw new Error(err)
    }
  }
}

release()
