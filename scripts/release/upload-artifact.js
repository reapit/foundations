const execSync = require('child_process').execSync
const { getVersionTag, WEB_APPS } = require('./utils')

const uploadArtifact = () => {
  const fileName = `${process.env.RELEASE_VERSION}.tar.gz`
  const { packageName } = getVersionTag()
  if (WEB_APPS.includes(packageName)) {
    try {
      const fetchConfigResult = execSync(`yarn workspace ${packageName} fetch-config development`).toString()
      console.info(fetchConfigResult)
      const lintResult = execSync(`yarn workspace ${packageName} lint`).toString()
      console.info(lintResult)
      const testResult = execSync(`yarn workspace ${packageName} test:ci`).toString()
      console.info(testResult)
      const buildResult = execSync(`yarn workspace ${packageName} build:prod`).toString()
      console.info(buildResult)
      const resultTarFile = execSync(
        `tar -C ./packages/${packageName}/public  -czvf ${fileName} --exclude='config.json' dist`,
      ).toString()
      console.info(resultTarFile)
      const copyS3Result = execSync(
        `aws s3 cp ${fileName} s3://cloud-release-artifact --grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers`,
      ).toString()
      console.info(copyS3Result)
    } catch (err) {
      console.error(err)
      throw new Error(err)
    }
  }
}

uploadArtifact()
