import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import http from 'http'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'

import { BookResolver } from './resolvers/book-resolver'
import { AuthorResolver } from './resolvers/author-resolver'
import { Context } from './types'
import { ensureTables } from './ddb'
import { AppResolver } from './resolvers/app-resolver'
import { ejectAppRoute } from './eject/route'

const start = async () => {
  await ensureTables()
  const schema = await buildSchema({
    resolvers: [BookResolver, AuthorResolver, AppResolver],
  })

  const app = express()
  const httpServer = http.createServer(app)
  const server = new ApolloServer({
    schema,
    context: ({ req }): Context => ({
      accessToken: req.headers.authorization?.split(' ')[1],
    }),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  })

  app.get('/eject/:appId', ejectAppRoute)
  await server.start()
  server.applyMiddleware({ app })

  const port = 4000
  await new Promise((resolve) => httpServer.listen(port, () => resolve(undefined)))
  console.log(`GraphQL Server is listening at port ${port}`)
}

start().catch(console.error)
