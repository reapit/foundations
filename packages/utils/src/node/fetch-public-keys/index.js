#!/usr/bin/env node

const syncKeys = require('./fetch-public-keys')
const fs = require('fs')
const constants = require('./constants')

const isTest = (process.argv[2] && process.argv[2] === '--test')

if (!isTest) {
  syncKeys()
} else {
  if (fs.existsSync(`./${constants.publicKeyFileName}`)) {
    console.log('existing public keys file')
    return
  } else {
    fs.writeFileSync(`./${constants.publicKeyFileName}`, JSON.stringify({}))
    console.log('mock public keys file created')
  }
}
