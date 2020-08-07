#!/usr/bin/env node
const AWS = require('aws-sdk')
const { getParamAndFileName } = require('./utils')

AWS.config.update({ region: 'eu-west-2' })

const ssm = new AWS.SSM()

const createParam = async cliArgs => {
  try {
    const { format } = cliArgs
    const { fileName, paramName } = getParamAndFileName(cliArgs)
    const source = require(fileName)
    if (!source) throw new Error('File not found for: ', source)

    const value = format === 'json' ? JSON.stringify(source) : String(source)

    console.log('Creating param: ', paramName)

    return new Promise(resolve => {
      const options = {
        Name: paramName,
        Value: value,
        Overwrite: true,
        Type: 'SecureString',
      }
      ssm.putParameter(options, err => {
        if (err) {
          throw new Error(`Something went wrong when creating your param: ${paramName} ${err.code}`)
        }

        console.log(`Successfully created ${paramName} value: ${value}`)
        resolve()
      })
    })
  } catch (err) {
    console.error('Repit Config Manager Error: ', err.message)
  }
}

module.exports = createParam
