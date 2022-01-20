import 'reflect-metadata'
import { ExtendedApolloServerExpress } from './extended-apollo-server'
import express from 'express'
import http from 'http'
import cors from 'cors'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'

import { Context } from './types'
import { ensureTables } from './ddb'
import { getSchema } from './get-schema'

const start = async () => {
  await ensureTables()

  const app = express()
  app.use(cors())
  const parseContext = ({ req }): Context => ({
    idToken: req.headers.authorization?.split(' ')[1] || '',
    accessToken: req.headers['reapit-connect-token'] as string,
    apiUrl: 'http://localhost:4000/',
  })
  const httpServer = http.createServer(app)
  const server = new ExtendedApolloServerExpress({
    schema: await getSchema(),
    context: parseContext,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    schemaCallback: (req) => getSchema(parseContext({ req })),
  })

  await server.start()
  server.applyMiddleware({ app })

  const port = 4000
  await new Promise((resolve) => httpServer.listen(port, () => resolve(undefined)))
  console.log(`GraphQL Server is listening at port ${port}`)
}

start().catch(console.error)
