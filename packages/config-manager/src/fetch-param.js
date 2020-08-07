#!/usr/bin/env node
const AWS = require('aws-sdk')
const fs = require('fs')
const { getParamAndFileName } = require('./utils')

AWS.config.update({ region: 'eu-west-2' })

const ssm = new AWS.SSM()

const fetchParam = cliArgs => {
  try {
    const { fileName, paramName, format } = getParamAndFileName(cliArgs)
    console.log('Fetching param: ', paramName)
    return new Promise(resolve => {
      const options = { Name: paramName, WithDecryption: false }
      ssm.getParameter(options, (err, data) => {
        if (err) {
          throw new Error(`Something went wrong when fetching your param: ${paramName} ${err.code}`)
        }
        const config = (data && data.Parameter && data.Parameter.Value) || {}
        console.log(
          `Successfully fetched ${paramName} values are: `,
          format === 'json' ? JSON.stringify(config) : config,
        )
        fs.writeFileSync(fileName, config)
        resolve()
      })
    })
  } catch (err) {
    console.error('Repit Config Manager Error: ', err.message)
  }
}

module.exports = fetchParam
