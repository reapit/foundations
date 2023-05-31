const fs = require('fs')
const path = require('path')
const { loadFilesSync } = require('@graphql-tools/load-files')
const { mergeTypeDefs } = require('@graphql-tools/merge')
const { print } = require('graphql')

const typeDefsIndexFile = mergeTypeDefs(
  loadFilesSync(path.join(__dirname, '../src/resolvers/**/*.graphql'), { recursive: true }),
  { all: true },
)
const typeDefsIndexPath = path.join(__dirname, '../src', 'schema.graphql')

/* Directly import doesn't work with webpack,
 * need to write to schema.graphql then import manually
 * https://github.com/Urigo/merge-graphql-schemas#install
 */
fs.writeFileSync(typeDefsIndexPath, print(typeDefsIndexFile))
