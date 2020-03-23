const { FOUNDATION_TYPES_FOLDER } = require('./constants')
const { existsSync, mkdirSync } = require('fs')

const createIndexFile = require('./create-index-file')
const fetchMarketplaceDefinition = require('./fetch-marketplace-definition')
const fetchPlatformDefinition = require('./fetch-platform-definition.js')
const { sync: rimraf } = require('rimraf')

if (existsSync(FOUNDATION_TYPES_FOLDER)) {
  rimraf(FOUNDATION_TYPES_FOLDER)
}

mkdirSync(FOUNDATION_TYPES_FOLDER)

Promise.all([fetchMarketplaceDefinition(), fetchPlatformDefinition()]).then(createIndexFile)
