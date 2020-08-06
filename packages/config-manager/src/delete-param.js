#!/usr/bin/env node
const AWS = require('aws-sdk')
const { getParamAndFileName } = require('./utils')

AWS.config.update({ region: 'eu-west-2' })

const ssm = new AWS.SSM()

const deleteParam = async cliArgs => {
  const { paramName } = getParamAndFileName(cliArgs)

  console.log('Deleting param: ', paramName)

  return new Promise(resolve => {
    const options = {
      Name: paramName,
    }
    ssm.deleteParameter(options, err => {
      if (err) {
        throw new Error(`Something went wrong when deleting your param: ${paramName} ${err.code}`)
      }

      console.log(`Successfully deleted ${paramName}`)
      resolve()
    })
  })
}

module.exports = deleteParam
