const path = require('path')
const { readFileSync } = require('fs')

module.exports = () => {
  const configPath = path.resolve(process.cwd(), './reapit.config.json')
  let config = {}
  try {
    let readConfig = readFileSync(configPath)
    config = JSON.parse(readConfig.toString())['LOCAL']
  } catch (err) {
    console.log(err);

    // Not able to read config
  }


  return config
}
