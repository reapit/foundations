#!/usr/bin/env node
const { SSMClient, GetParameterCommand, PutParameterCommand } = require('@aws-sdk/client-ssm')
const chalk = require('chalk')
const fs = require('fs')
const { getParamAndFileName } = require('./utils')

const ssm = new SSMClient({ region: 'eu-west-2' })

const getBase = async (paramName, format) => {
  try {
    const command = new GetParameterCommand({ Name: paramName, WithDecryption: true })
    const data = await ssm.send(command)

    const value = data && data.Parameter && data.Parameter.Value
    console.log(chalk.bold.green(`Successfully fetched base param for ${paramName}`))

    if (value) {
      const formatted = format === 'string' ? value : JSON.parse(data.Parameter.Value)
      return formatted
    }

    const defaultValue = format === 'string' ? '' : {}
    return defaultValue
  } catch (err) {
    throw new Error(`Something went wrong when fetching param to update ${paramName} ${err.message}`)
  }
}

const updateParam = async (cliArgs) => {
  const { format } = cliArgs
  const { fileName, paramName } = getParamAndFileName(cliArgs)

  try {
    const source = format === 'string' ? fs.readFileSync(fileName, 'utf8') : require(fileName)
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

    const command = new PutParameterCommand({
      Name: paramName,
      Value: value,
      Overwrite: true,
      Type: 'SecureString',
    })

    await ssm.send(command)
    console.log(chalk.bold.green(`Successfully updated ${paramName}`))
  } catch (err) {
    console.log(chalk.red.bold('Error:', err.message || `Something went wrong when updating your param ${paramName}`))
    throw err
  }
}

module.exports = updateParam
