#!/usr/bin/env node
const { argv } = require('yargs')
const chalk = require('chalk')
const { parseArgv } = require('./utils')
const loadCli = require('./load-cli')
const fetchParam = require('./fetch-param')
const createParam = require('./create-param')
const updateParam = require('./update-param')
const deleteParam = require('./delete-param')

return (async () => {
  console.log(chalk.blue.bold('Welcome to Reapit Config Manager'))
  try {
    const cliArgs = parseArgv(argv)
    const cliParams = !cliArgs.mode ? parseArgv(await loadCli()) : cliArgs

    if (cliParams.mode === 'fetch') return await fetchParam(cliParams)
    if (cliParams.mode === 'create') return await createParam(cliParams)
    if (cliParams.mode === 'update') return await updateParam(cliParams)
    if (cliParams.mode === 'delete') return await deleteParam(cliParams)

    throw new Error('The value of your --mode flag is invalid - options are fetch, create, update and delete')
  } catch (err) {
    console.log(chalk.red.bold('Error:', err.message))
  }
})()
