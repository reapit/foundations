#!/usr/bin/env node
const { SSMClient, GetParameterCommand } = require('@aws-sdk/client-ssm')
const chalk = require('chalk')
const fs = require('fs')
const { spawnSync } = require('child_process')
const { getParamAndFileName } = require('./utils')

const ssm = new SSMClient({ region: 'eu-west-2' })

const fetchParam = async (cliArgs) => {
  const { format } = cliArgs
  const { fileName, paramName } = getParamAndFileName(cliArgs)

  try {
    console.log(chalk.bold.blue('Fetching param: ', paramName))

    const command = new GetParameterCommand({ Name: paramName, WithDecryption: true })
    const data = await ssm.send(command)

    const config = (data && data.Parameter && data.Parameter.Value) || {}
    console.log(chalk.bold.green(`Successfully fetched ${paramName}`))
    fs.writeFileSync(fileName, config)
    format !== 'string' && spawnSync(`npx prettier --write ${fileName}`, { shell: false })
  } catch (err) {
    console.log(chalk.red.bold('Error:', err.message || `Something went wrong when fetching your param: ${paramName}`))
    throw err
  }
}

module.exports = fetchParam
