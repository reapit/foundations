#!/usr/bin/env node
const AWS = require('aws-sdk')
const { getParamAndFileName } = require('./utils')

AWS.config.update({ region: 'eu-west-2' })

const ssm = new AWS.SSM()

const getBase = paramName => {
  return new Promise((resolve, reject) => {
    const options = { Name: paramName, WithDecryption: true }
    ssm.getParameter(options, (err, data) => {
      if (err) {
        return reject(new Error(`Something went wrong when fetching param to update ${paramName} ${err.code}`))
      }
      const config = (data && data.Parameter && data.Parameter.Value) || {}
      console.log(`Successfully fetched base param for ${paramName}`)

      return resolve(config)
    })
  })
}

const updateParam = async cliArgs => {
  try {
    const { format } = cliArgs
    const { fileName, paramName } = getParamAndFileName(cliArgs)
    const source = require(fileName)
    if (!source) throw new Error('File not found for: ', source)

    const base = await getBase(paramName, format)
    const value =
      format === 'json'
        ? JSON.stringify({
            ...base,
            ...source,
          })
        : String(source)
    console.log('Updating param: ', paramName)

    return new Promise((resolve, reject) => {
      const options = {
        Name: paramName,
        Value: value,
        Overwrite: true,
        Type: 'SecureString',
      }
      ssm.putParameter(options, err => {
        if (err) {
          return reject(new Error(`Something went wrong when updating your param ${paramName} ${err.code}`))
        }

        console.log(`Successfully updated ${paramName} new value ${value}`)

        return resolve(true)
      })
    })
  } catch (err) {
    console.log('here', err)
    console.error('Repit Config Manager Error: ', err.message)
  }
}

module.exports = updateParam
