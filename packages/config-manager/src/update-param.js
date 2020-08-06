#!/usr/bin/env node
const AWS = require('aws-sdk')
const fs = require('fs')
const { getParamAndFileName } = require('./utils')
const fetchParam = require('./fetch-param')

AWS.config.update({ region: 'eu-west-2' })

const ssm = new AWS.SSM()

const updateParam = async cliArgs => {
  const { format } = cliArgs
  const { fileName, paramName } = getParamAndFileName(cliArgs)
  const source = require(fileName)
  if (!source) throw new Error('File not found for: ', source)

  const base = await fetchParam(cliArgs)
  const value =
    format === 'JSON'
      ? {
          ...base,
          ...source,
        }
      : source
  console.log('Updating param: ', paramName)
  return new Promise(resolve => {
    const options = {
      Name: paramName,
      Value: value,
      Overwrite: true,
      Type: 'SecureString',
    }
    ssm.putParameter(options, (err, data) => {
      if (err) {
        throw new Error(`Something went wrong when updating your param: ${paramName} ${err.code}`)
      }
      const config = (data && data.Parameter && data.Parameter.Value) || {}
      console.log(`Successfully updated ${paramName} new value: `, format === 'json' ? JSON.stringify(config) : config)
      fs.writeFileSync(fileName, config)
      resolve()
    })
  })
}

module.exports = updateParam
