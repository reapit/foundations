const path = require('path')
const yargs = require('yargs')

const stage = yargs.argv.stage

const listServerlessYmlFiles = [path.resolve(__dirname, '../src/search-widget/server/serverless.yml')]

const deployServerless = async () => {}
