import 'reflect-metadata'
import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import http from 'http'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'

import { Context } from './types'
import { ensureTables } from './ddb'
import { ejectAppRoute } from './eject/route'
import { getSchema } from './get-schema'

const start = async () => {
  await ensureTables()
  const schema = await getSchema()

  const app = express()
  const httpServer = http.createServer(app)
  const server = new ApolloServer({
    schema,
    context: ({ req }): Context => ({
      idToken: req.headers.authorization?.split(' ')[1],
      accessToken: req.headers['reapit-connect-token'] as string,
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
