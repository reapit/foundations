const { runCommand } = require('../../../../scripts/release/utils')
const path = require('path')

const releaseDevThemes = () => {
  try {
    const bucketName = 'reapit-web-components'
    const themesDistPath = path.resolve(__dirname, '../../', 'public', 'themes')

    runCommand('aws', [
      's3',
      'cp',
      themesDistPath,
      `s3://${bucketName}`,
      '--grants',
      'read=uri=http://acs.amazonaws.com/groups/global/AllUsers',
      '--recursive',
    ])
  } catch (err) {
    console.error(err)
    throw new Error(err)
  }
}

releaseDevThemes()
