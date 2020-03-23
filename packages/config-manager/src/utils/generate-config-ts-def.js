const { json2ts } = require('json-ts')
const fs = require('fs')
const { REAPIT_TS_DEF_IN_CWD_PATH, REAPIT_TS_DEF_NAME } = require('../paths')
const formatCode = require('../../../foundations-ts-definitions/scripts/format-code')

exports.generateConfigTsDef = config => {
  try {
    const generatedTsDef = json2ts(config, {
      namespace: '',
      rootName: 'ProcessEnv',
      prefix: '',
    })

    let formattedGeneratedTsDef = `export ${formatCode(generatedTsDef)}`
    fs.writeFileSync(REAPIT_TS_DEF_IN_CWD_PATH, formattedGeneratedTsDef)

    console.log(`${REAPIT_TS_DEF_NAME} has been saved - be sure to add to your .gitignore file`)
  } catch (err) {
    console.log(
      'Something went wrong when generating typescript definition. Detailed error with stack trace is provided below:',
    )
    console.log(err, err.stack)
  }
}
