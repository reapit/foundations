const path = require('path')

const reapitConfig = require(path.resolve(__dirname, '../../../..', 'reapit-config.json'))

const setEnv = () => {
  const configs = reapitConfig[process.env.REAPIT_ENV]

  for (const k in configs) {
    process.env[k] = configs[k]
  }

  return configs
}

module.exports = {
  setEnv,
}
