const { WEB_APPS, sendMessageToSlack } = require('./utils')
const fs = require('fs')
const { runCommand } = require('./utils')

const fetchCachedTarFile = async () => {
  const [, , ...args] = process.argv
  const packageName = args[0]
  const currentTag = args[1]

  if (WEB_APPS.includes(packageName)) {
    try {
      const publicPath = `./packages/${packageName}/public`
      fs.mkdirSync(publicPath, { recursive: true })
      const fileName = `${currentTag}.tar.gz`
      await sendMessageToSlack(`Pulling release \`${currentTag}\` from S3 \`cloud-deployments-releases-cache-prod\``)
      runCommand('aws', ['s3', 'cp', `s3://cloud-deployments-releases-cache-prod/${fileName}`, publicPath])
    } catch (err) {
      console.error('fetchArtifact', err)
      throw new Error(err)
    }
  }
}

fetchCachedTarFile()
