const prompts = require('prompts')

const loadCli = async () => {
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
      type: 'select',
      name: 'format',
      message: 'Format for source file',
      choices: [
        { title: 'JSON', value: 'json' },
        { title: 'Plain Text', value: 'text' },
      ],
    },
    {
      type: 'text',
      name: 'filePath',
      message: 'Source file path for your parameter',
      initial: './config.source.json',
    },
  ]

  return await prompts(questions)
}

module.exports = loadCli
