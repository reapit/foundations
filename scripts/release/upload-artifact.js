const execSync = require('child_process').execSync
const { getVersionTag, WEB_APPS, sendMessageToSlack } = require('./utils')

const uploadArtifact = async () => {
  const fileName = `${process.env.RELEASE_VERSION}.tar.gz`
  const { packageName } = getVersionTag()
  if (WEB_APPS.includes(packageName)) {
    let workspaceName = packageName
    if (packageName === 'elements') {
      workspaceName = '@reapit/elements'
    }
    try {
      const fetchConfigResult = execSync(`yarn workspace ${workspaceName} fetch-config development`).toString()
      console.info(fetchConfigResult)
      const lintResult = execSync(`yarn workspace ${workspaceName} lint`).toString()
      console.info(lintResult)
      const testResult = execSync(`yarn workspace ${workspaceName} test:ci`).toString()
      console.info(testResult)
      const buildResult = execSync(`yarn workspace ${workspaceName} build:prod`).toString()
      console.info(buildResult)
      const resultTarFile = execSync(
        `tar -C ./packages/${packageName}/public  -czvf ${fileName} --exclude='config.json' dist`,
      ).toString()
      console.info(resultTarFile)
      const copyS3Result = execSync(
        `aws s3 cp ${fileName} s3://cloud-release-artifact --grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers`,
      ).toString()
      console.info(copyS3Result)
      await sendMessageToSlack(`Finish build \`${packageName}\` with file \`${fileName}\``)
    } catch (err) {
      console.error(err)
      await sendMessageToSlack(`Build failed for \`${packageName}\` with file \`${fileName}\``)
      throw new Error(err)
    }
  }
}

uploadArtifact()
