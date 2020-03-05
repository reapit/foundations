const { writeConfigInCWD } = require('./write-config-in-cwd')
const { generateConfigTsDef } = require('./generate-config-ts-def')
const fs = require('fs')

const { REAPIT_BASE_CONFIG_PATH } = require('../paths')

module.exports = (err, isGenerateConfigTsDef) => {
  console.log('Something went wrong when fetching config. Detailed error with stack trace is provided below:')
  console.error(err, err.stack)
  console.log('A base configuration file will be provided')

  let config = ''
  try {
    config = fs.readFileSync(REAPIT_BASE_CONFIG_PATH)
  } catch (err) {
    console.log(
      'Something went wrong when reading base configuration. Detailed error with stack trace is provided below:',
    )
    console.error(err, err.stack)
    process.exit(1)
  }

  if (isGenerateConfigTsDef) {
    generateConfigTsDef(config)
  }

  return writeConfigInCWD(config)
}
