import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import { ApolloServer } from 'apollo-server'
import { BookResolver } from './resolvers/book-resolver'
import { AuthorResolver } from './resolvers/author-resolver'
import { Context } from './types'
import { ensureTables } from './ddb'
import { AppResolver, defaultNodes } from './resolvers/app-resolver'
import { ejectApp } from './eject'
import { writeFile } from 'fs-extra'
import { generateIndex } from './eject/templates'

const start = async () => {
  console.log(await ensureTables())
  const schema = await buildSchema({
    resolvers: [BookResolver, AuthorResolver, AppResolver],
  })

  const server = new ApolloServer({
    schema,
    context: ({ req }): Context => ({
      accessToken: req.headers.authorization?.split(' ')[1],
    }),
  })
  const { url } = await server.listen()
  console.log(`GraphQL Server is listening at ${url}`)
}

// start().catch(console.error)

ejectApp({
  name: 'test',
  createdAt: new Date(),
  updatedAt: new Date(),
  id: 'test',
  userId: 'test',
  pages: [
    {
      id: '~',
      name: 'test',
      nodes: defaultNodes.map((node) => ({
        ...node,
        id: `test~${node.nodeId}`,
      })),
    },
  ],
})
  .then((ejection) => {
    return writeFile('output.zip', ejection)
  })
  .then(() => {
    console.log('done')
  })