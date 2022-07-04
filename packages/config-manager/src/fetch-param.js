#!/usr/bin/env node
const AWS = require('aws-sdk')
const chalk = require('chalk')
const fs = require('fs')
const { spawnSync } = require('child_process')
const { getParamAndFileName } = require('./utils')

AWS.config.update({ region: 'eu-west-2' })

const ssm = new AWS.SSM()

const fetchParam = (cliArgs) => {
  try {
    const { format } = cliArgs
    const { fileName, paramName } = getParamAndFileName(cliArgs)
    console.log(chalk.bold.blue('Fetching param: ', paramName))
    return new Promise((resolve) => {
      const options = { Name: paramName, WithDecryption: true }
      ssm.getParameter(options, (err, data) => {
        if (err) {
          throw new Error(`Something went wrong when fetching your param: ${paramName} ${err.code}`)
        }
        const config = (data && data.Parameter && data.Parameter.Value) || {}
        console.log(chalk.bold.green(`Successfully fetched ${paramName}`))
        fs.writeFileSync(fileName, config)
        format !== 'string' && spawnSync(`npx prettier --write ${fileName}`, { shell: false })
        resolve()
      })
    })
  } catch (err) {
    console.log(chalk.red.bold('Error:', err.message))
  }
}

module.exports = fetchParam
