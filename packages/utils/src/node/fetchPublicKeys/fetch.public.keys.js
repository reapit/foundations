#!/usr/bin/env node

const fs = require('fs')
const jwkToPem = require('jwk-to-pem')
require('isomorphic-fetch')
const constants = require('./constants')

const getPublicKeys = async (connectUserPoolId) => {
  try {
    const cognitoIssuer = `https://cognito-idp.eu-west-2.amazonaws.com/${connectUserPoolId}/.well-known/jwks.json`
    const res = await fetch(cognitoIssuer, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    const publicKeys = await res.json()

    if (!publicKeys) throw new Error('Public keys not returned from Reapit Connect')

    const keys = publicKeys.keys.reduce((agg, current) => {
      const pem = jwkToPem(current)

      agg[current.kid] = { instance: current, pem }

      return agg
    }, {})
    return keys
  } catch (error) {
    console.error('Reapit Connect Session error:', error.message)
  }
}

module.exports = async () => {
  if (!fs.existsSync(`./${constants.configFileName}`)) {
    console.error('Could not found config.json locally')

    return
  }

  const config = JSON.parse(fs.readFileSync(`./${constants.configFileName}`))

  const keys = await getPublicKeys(config.CONNECT_USER_POOL)
  if (!keys) {
    console.error('Failed to get keys')
    return
  }

  fs.writeFileSync(`./${constants.publicKeyFileName}`, JSON.stringify(keys))

  console.log('Successfully fetched public keys')
}
