#!/usr/bin/env node
const AWS = require('aws-sdk')
const chalk = require('chalk')
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
      const config = (data && data.Parameter && data.Parameter.Value && JSON.parse(data.Parameter.Value)) || {}
      console.log(chalk.bold.green(`Successfully fetched base param for ${paramName}`))

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
      format && format === 'string'
        ? String(source)
        : JSON.stringify({
            ...base,
            ...source,
          })

    console.log(chalk.bold.blue('Updating param: ', paramName))

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

        console.log(chalk.bold.green(`Successfully updated ${paramName}`))

        return resolve(true)
      })
    })
  } catch (err) {
    console.log(chalk.red.bold('Error:', err.message))
  }
}

module.exports = updateParam
