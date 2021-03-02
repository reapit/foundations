#!/usr/bin/env node
const AWS = require('aws-sdk')
const chalk = require('chalk')
const fs = require('fs')
const { getParamAndFileName } = require('./utils')

AWS.config.update({ region: 'eu-west-2' })

const ssm = new AWS.SSM()

const createParam = async (cliArgs) => {
  try {
    const { format } = cliArgs
    const { fileName, paramName } = getParamAndFileName(cliArgs)
    const source = format === 'string' ? fs.readFileSync(fileName, 'utf8') : require(fileName)
    if (!source) throw new Error('File not found for: ', source)

    const value = format && format === 'string' ? String(source) : JSON.stringify(source)

    console.log(chalk.bold.blue('Creating param: ', paramName))

    return new Promise((resolve) => {
      const options = {
        Name: paramName,
        Value: value,
        Overwrite: true,
        Type: 'SecureString',
      }
      ssm.putParameter(options, (err) => {
        if (err) {
          throw new Error(`Something went wrong when creating your param: ${paramName} ${err.code}`)
        }

        console.log(chalk.bold.green(`Successfully created ${paramName}`))
        resolve()
      })
    })
  } catch (err) {
    console.log(chalk.red.bold('Error:', err.message))
  }
}

module.exports = createParam
