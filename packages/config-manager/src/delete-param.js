#!/usr/bin/env node
const AWS = require('aws-sdk')
const chalk = require('chalk')
const { getParamAndFileName } = require('./utils')

AWS.config.update({ region: 'eu-west-2' })

const ssm = new AWS.SSM()

const deleteParam = async (cliArgs) => {
  try {
    const { paramName } = getParamAndFileName(cliArgs)

    console.log(chalk.bold.blue(`Deleting param: ${paramName}`))

    return new Promise((resolve) => {
      const options = {
        Name: paramName,
      }
      ssm.deleteParameter(options, (err) => {
        if (err) {
          throw new Error(`Something went wrong when deleting your param: ${paramName} ${err.code}`)
        }

        console.log(chalk.bold.green(`Successfully deleted: ${paramName}`))
        resolve()
      })
    })
  } catch (err) {
    console.error(chalk.bold.red('Error: ', err.message))
  }
}

module.exports = deleteParam
