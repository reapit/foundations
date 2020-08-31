const {
  releaseWebApp,
  sendMessageToSlack,
  releaseNpm,
  releaseServerless,
  SERVERLESS_APPS,
  NPM_APPS,
  WEB_APPS,
} = require('./utils')

const release = async () => {
  const [, , ...args] = process.argv
  const env = args[0]
  const packageName = args[1]
  const currentTag = args[2]
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

  if (WEB_APPS.includes(packageName) && env === 'production') {
    try {
      const isValidWebApp = isValidParams && !!env
      if (!isValidWebApp) {
        console.error('release params is not valid for packageName or currentTag or previousTag')
        process.exit(1)
      }
      releaseWebApp({ tagName: currentTag, packageName, env })
    } catch (err) {
      await sendMessageToSlack(`Deploy \`${packageName}\` version \`${currentTag}\` failed`)
      throw new Error(err)
    }
  }

  if (WEB_APPS.includes(packageName) && env === 'development') {
    try {
      const isValidWebApp = isValidParams && !!env
      if (!isValidWebApp) {
        console.error('release params is not valid for packageName or currentTag or previousTag')
        process.exit(1)
      }
      releaseWebApp({ tagName: currentTag, packageName, env })
    } catch (err) {
      await sendMessageToSlack(`Deploy \`${packageName}\` version \`${currentTag}\` failed`)
      throw new Error(err)
    }
  }
}

release()
