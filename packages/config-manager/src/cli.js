#!/usr/bin/env node
const createSecret = require('./index').createSecret
const updateSecret = require('./index').updateSecret
const getSecret = require('./index').getSecret
const deleteSecret = require('./index').deleteSecret
const setEnv = require('./index').setEnv
const getAllSecrets = require('./index').getAllSecrets
const fetchConfig = require('./index').fetchConfig

const parseFlags = flags => {
  const result = {}
  for (let flag of flags) {
    if (flag === '--ts-def') {
      result.isGenerateConfigTsDef = true
      continue
    }
  }
  return result
}

return (() => {
  const [, , ...args] = process.argv

  if (args.length >= 2 && args[0] && args[1]) {
    const [method, secretName, reapitEnv = 'LOCAL', ...flags] = args
    const parsedFlags = parseFlags(flags)

    switch (method) {
      case 'createSecret':
        return createSecret(secretName)
      case 'updateSecret':
        return updateSecret(secretName)
      case 'getAllSecrets':
        return getAllSecrets(secretName, parsedFlags.isGenerateConfigTsDef)
      case 'getSecret':
        return getSecret(secretName, reapitEnv, parsedFlags.isGenerateConfigTsDef)
      case 'deleteSecret':
        return deleteSecret(secretName)
      case 'setEnv':
        return setEnv(secretName)
      case 'fetchConfig':
        return fetchConfig(secretName, reapitEnv)
      default:
        console.error('Method Not Found')
        process.exit(1)
    }
  }

  console.error('Two arguments need to be suppled <<methodName>> and <<secretName>>')
  process.exit(1)
})()
