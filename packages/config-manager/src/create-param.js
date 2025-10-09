#!/usr/bin/env node
const { SSMClient, PutParameterCommand } = require('@aws-sdk/client-ssm')
const chalk = require('chalk')
const fs = require('fs')
const { getParamAndFileName } = require('./utils')

const ssm = new SSMClient({ region: 'eu-west-2' })

const createParam = async (cliArgs) => {
  const { format } = cliArgs
  const { fileName, paramName } = getParamAndFileName(cliArgs)

  try {
    const source = format === 'string' ? fs.readFileSync(fileName, 'utf8') : require(fileName)
    if (!source) throw new Error('File not found for: ', source)

    const value = format && format === 'string' ? String(source) : JSON.stringify(source)

    console.log(chalk.bold.blue('Creating param: ', paramName))

    const command = new PutParameterCommand({
      Name: paramName,
      Value: value,
      Overwrite: true,
      Type: 'SecureString',
    })

    await ssm.send(command)
    console.log(chalk.bold.green(`Successfully created ${paramName}`))
  } catch (err) {
    console.log(chalk.red.bold('Error:', err.message || `Something went wrong when creating your param: ${paramName}`))
    throw err
  }
}

module.exports = createParam
