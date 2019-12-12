#!/usr/bin/env node
const createSecret = require('./index').createSecret
const updateSecret = require('./index').updateSecret
const getSecret = require('./index').getSecret
const deleteSecret = require('./index').deleteSecret

return (() => {
  const [, , ...args] = process.argv

  if (args.length >= 2 && args[0] && args[1]) {
    const method = args[0]
    const secretName = args[1]

    switch (method) {
      case 'createSecret':
        return createSecret(secretName)
      case 'updateSecret':
        return updateSecret(secretName)
      case 'getSecret':
        return getSecret(secretName)
      case 'deleteSecret':
          return deleteSecret(secretName)
      default:
        console.error('Method Not Found')
        process.exit(1)
    }
  }

  console.error(
    'Two arguments need to be suppled <<methodName>> and <<secretName>>'
  )
  process.exit(1)
})()
