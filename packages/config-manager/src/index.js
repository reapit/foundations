#!/usr/bin/env node
const { argv } = require('yargs')
const { parseArgv } = require('./utils')
const loadCli = require('./load-cli')
const fetchParam = require('./fetch-param')
const createParam = require('./create-param')
const updateParam = require('./update-param')
const deleteParam = require('./delete-param')

return (async () => {
  console.log('Loading Reapit Config Manager')
  try {
    const cliArgs = parseArgv(argv)
    const cliParams = !cliArgs.mode ? parseArgv(await loadCli()) : cliArgs

    if (cliParams.mode === 'fetch') return fetchParam(cliParams)
    if (cliParams.mode === 'create') return createParam(cliParams)
    if (cliParams.mode === 'update') return updateParam(cliParams)
    if (cliParams.mode === 'delete') return deleteParam(cliParams)

    throw new Error('The value of your --mode flag is invalid - options are fetch, create, update and delete')
  } catch (err) {
    console.error('Repit Config Manager Error: ', err.message)
  }
})()
