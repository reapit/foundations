const fs = require('fs')
const path = require('path')
const { fileLoader, mergeTypes } = require('merge-graphql-schemas')

const typeDefsIndexFile = mergeTypes(
  fileLoader(path.join(__dirname, '../src/resolvers/**/*.graphql'), { recursive: true }),
  { all: true },
)
const typeDefsIndexPath = path.join(__dirname, '../src', 'schema.graphql')

/* Directly import doesn't work with webpack,
 * need to write to schema.graphql then import manually
 * https://github.com/Urigo/merge-graphql-schemas#install
 */
fs.writeFileSync(typeDefsIndexPath, typeDefsIndexFile)
