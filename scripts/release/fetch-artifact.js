const { WEB_APPS, sendMessageToSlack } = require('./utils')
const execSync = require('child_process').execSync

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
      const copyArtifactResult = execSync(
        `aws s3 cp s3://cloud-deployments-releases-cache-prod/${fileName} ./packages/${packageName}/public`,
      ).toString()
      console.info(copyArtifactResult)
    } catch (err) {
      console.error('fetchArtifact', err)
      throw new Error(err)
    }
  }
}

fetchCachedTarFile()
