const { runCommand } = require('./utils')
const { getVersionTag, WEB_APPS, sendMessageToSlack } = require('./utils')

const uploadArtifact = async () => {
  const fileName = `${process.env.RELEASE_VERSION}.tar.gz`
  const { packageName } = getVersionTag()
  if (WEB_APPS.includes(packageName)) {
    let workspaceName = packageName
    if (packageName === 'elements') {
      workspaceName = '@reapit/elements'
    }
    if (packageName === 'web-components') {
      workspaceName = '@reapit/web-components'
    }
    try {
      await runCommand('yarn', ['workspace', workspaceName, 'fetch-config', '--name', 'production'])
      await runCommand('yarn', ['workspace', workspaceName, 'lint'])
      await runCommand('yarn', ['workspace', workspaceName, 'test:ci'])
      await runCommand('yarn', ['workspace', workspaceName, 'build:prod'])
      await runCommand('tar', [
        '-C',
        `./packages/${packageName}/public`,
        '-czvf',
        fileName,
        '--exclude="config.json"',
        'dist',
      ])
      await runCommand('aws', [
        's3',
        'cp',
        fileName,
        's3://cloud-deployments-releases-cache-prod',
        '--grants',
        'read=uri=http://acs.amazonaws.com/groups/global/AllUsers',
      ])
      await sendMessageToSlack(`Finish build \`${packageName}\` with file \`${fileName}\``)
    } catch (err) {
      console.error(err)
      await sendMessageToSlack(`Build failed for \`${packageName}\` with file \`${fileName}\``)
      throw new Error(err)
    }
  }
}

uploadArtifact()
