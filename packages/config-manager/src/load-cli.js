const prompts = require('prompts')
const chalk = require('chalk')

const loadCli = async () => {
  const questions = [
    {
      type: 'text',
      name: 'namespace',
      message: 'Top level namespace for this parameter eg Owner',
      initial: 'cloud',
      validate: value => {
        return typeof value === 'string' && value.length ? true : 'Value cannot be empty and must be a string'
      },
    },
    {
      type: 'text',
      name: 'entity',
      message: 'Entity of this parameter eg App, Package or Service name',
      validate: value => {
        return typeof value === 'string' && value.length ? true : 'Value cannot be empty and must be a string'
      },
    },
    {
      type: 'text',
      name: 'name',
      message: 'Name of this parameter eg Environment, Function, DB Connection (optional)',
      initial: 'local',
      validate: value => {
        return typeof value === 'string' && value.length ? true : 'Value cannot be empty and must be a string'
      },
    },
    {
      type: 'select',
      name: 'mode',
      message: 'Method to perform on parameter',
      choices: [
        { title: 'Update', value: 'update' },
        { title: 'Create', value: 'create' },
        { title: 'Delete', value: 'delete' },
        { title: 'Fetch', value: 'fetch' },
      ],
    },
    {
      type: prev => {
        return prev !== 'delete' ? 'select' : null
      },
      name: 'format',
      message: 'Format for source or target file',
      choices: [
        { title: 'JSON', value: 'json' },
        { title: 'String', value: 'string' },
      ],
    },
    {
      type: prev => {
        return prev !== 'delete' ? 'text' : null
      },
      name: 'filePath',
      message: 'Source or target file path for your parameter',
      initial: prev => {
        return prev === 'json' ? `${process.cwd()}/config.json` : `${process.cwd()}/config.txt`
      },
      validate: value => {
        return typeof value === 'string' && value.length ? true : 'Value cannot be empty and must be a string'
      },
    },
  ]
  try {
    return await prompts(questions)
  } catch (err) {
    console.log(chalk.red.bold('Error:', err.message))
  }
}

module.exports = loadCli
