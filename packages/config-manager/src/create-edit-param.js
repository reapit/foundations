const AWS = require('aws-sdk')
const fs = require('fs')
const prompts = require('prompts')
const ssm = new AWS.SSM()
const { pascalCase } = require('change-case')

const fetchConfig = (secretName, env = 'local') => {
  ssm.getParameter({ Name: `${secretName}-${env}`, WithDecryption: false }, (err, data) => {
    if (err) {
      console.log('Something went wrong when fetch the config.json')
      console.error(err, err.stack)
      process.exit(1)
    }
    try {
      const config = (data && data.Parameter && data.Parameter.Value) || {}
      return fs.writeFileSync(`${process.cwd()}/config.json`, config)
    } catch (err) {
      console.log(
        'Something went wrong when parsing base configuration. Detailed error with stack trace is provided below:',
      )
      console.error(err, err.stack)
      process.exit(1)
    }
  })
}

// const writeConfig = () => {
//   const params = {
//     Name: 'STRING_VALUE',
//     Value: 'STRING_VALUE',
//     Overwrite: true,
//     Type: 'SecureString',
//   }
//   ssm.putParameter(params, function(err, data) {
//     if (err) console.log(err, err.stack)
//     // an error occurred
//     else console.log(data) // successful response
//   })
// }

const questions = [
  {
    type: 'text',
    name: 'namespace',
    message: 'Top level namespace for this parameter eg Owner',
    initial: 'cloud',
  },
  {
    type: 'text',
    name: 'entity',
    message: 'Entity of this parameter eg App, Package or Service name',
  },
  {
    type: 'text',
    name: 'name',
    message: 'Name this variable eg Environment, Function, DB Connection (optional)',
    initial: 'local',
  },
  {
    type: 'confirm',
    name: 'isUpdate',
    message: 'Are you updating this parameter?',
    initial: true,
  },
  {
    type: 'select',
    name: 'format',
    message: 'Format for source file',
    choices: [
      { title: 'JSON', value: 'JSON' },
      { title: 'Plain Text', value: 'TEXT' },
    ],
  },
  {
    type: 'text',
    name: 'sourceFile',
    message: 'Source JSON file for your parameter',
    initial: './config.source.json',
  },
]

return (async () => {
  const response = await prompts(questions)
  const { namespace, package, name, isUpdate, sourceFile, format } = response
  const source = require(sourceFile)
  const base = isUpdate ? await fetchConfig() : {}
  const value =
    format === 'JSON'
      ? {
          ...base,
          ...source,
        }
      : source
  const paramName = `${pascalCase(namespace)}/${pascalCase(package)}${name ? `/${pascalCase(name)}` : ''}`

  const params = {
    Name: paramName,
    Value: value,
    Overwrite: true,
    Type: 'SecureString',
  }
  ssm.putParameter(params, (err, data) => {
    if (err) console.log(err, err.stack)
    // an error occurred
    else console.log(data) // successful response
  })

  // console.log(JSON.stringify(response))
  // => { twitter: 'terkelg', color: [ '#ff0000', '#0000ff' ] }
})()

// module.exports = { writeConfig, fetchConfig }
