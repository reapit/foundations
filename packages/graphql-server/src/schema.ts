import path from 'path'
import { fileLoader, mergeTypes } from 'merge-graphql-schemas'
import { writeFileSync } from 'fs'

const typesArray = fileLoader(path.join(__dirname, './resolvers/**/*.graphql'), { recursive: true })

const typeDefs = mergeTypes(typesArray, { all: true })
export default typeDefs
writeFileSync('joined.graphql', typeDefs)
