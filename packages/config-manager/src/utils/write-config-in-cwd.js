const fs = require('fs')
const { REAPIT_CONFIG_IN_CWD_PATH } = require('../paths')

exports.writeConfigInCWD = config => {
  return fs.writeFile(REAPIT_CONFIG_IN_CWD_PATH, config, 'utf8', err => {
    if (err) {
      console.error('An error occured while writing JSON Object to File.', err)
      console.error(err)
      process.exit(1)
    }

    console.log('reapit-config.json has been saved - be sure to add to your .gitignore file')
  })
}
