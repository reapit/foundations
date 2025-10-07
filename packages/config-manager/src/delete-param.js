#!/usr/bin/env node
const { SSMClient, DeleteParameterCommand } = require('@aws-sdk/client-ssm')
const chalk = require('chalk')
const { getParamAndFileName } = require('./utils')

const ssm = new SSMClient({ region: 'eu-west-2' })

const deleteParam = async (cliArgs) => {
  const { paramName } = getParamAndFileName(cliArgs)
  
  try {
    console.log(chalk.bold.blue(`Deleting param: ${paramName}`))

    const command = new DeleteParameterCommand({ Name: paramName })
    await ssm.send(command)
    
    console.log(chalk.bold.green(`Successfully deleted: ${paramName}`))
  } catch (err) {
    console.error(
      chalk.bold.red('Error: ', err.message || `Something went wrong when deleting your param: ${paramName}`),
    )
    throw err
  }
}

module.exports = deleteParam
