const { WEB_APPS, sendMessageToSlack } = require('./utils')
const { runCommand } = require('./utils')

const fetchCachedTarFile = async () => {
  const [, , ...args] = process.argv
  const packageName = args[0]
  const currentTag = args[1]

  if (WEB_APPS.includes(packageName)) {
    try {
      const fileName = `${currentTag}.tar.gz`
      await sendMessageToSlack(
        `Pulling the artifact \`${currentTag}\` from S3 bucket \`cloud-deployments-releases-cache-prod\``,
      )
      await runCommand('aws', [
        's3',
        'cp',
        `s3://cloud-deployments-releases-cache-prod/${fileName}`,
        `./packages/${packageName}/public`,
      ])
    } catch (err) {
      console.error('fetchArtifact', err)
      throw new Error(err)
    }
  }
}

fetchCachedTarFile()
