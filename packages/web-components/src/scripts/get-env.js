const path = require('path')

const reapitConfig = require(path.resolve(__dirname, '../..', 'config.json'))

const setEnv = () => {
  const configs = reapitConfig[process.env.APP_ENV]

  for (const k in configs) {
    process.env[k] = configs[k]
  }

  return configs
}

module.exports = {
  setEnv,
}
