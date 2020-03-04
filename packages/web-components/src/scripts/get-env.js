const path = require('path')

const reapitConfig = require(path.resolve(__dirname, '../../../..', 'reapit-config.json'))

export const getEnv = () => {
  const configs = reapitConfig[process.env.REAPIT_ENV || 'LOCAL']

  for (const k in configs) {
    process.env[k] = configs[k]
  }

  return configs
}
