import 'reflect-metadata'
import { ExtendedApolloServerExpress } from './extended-apollo-server'
import express from 'express'
import http from 'http'
import cors from 'cors'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'

import { Context } from './types'
import { ensureTables } from './ddb'
import { getSchema } from './get-schema'
import { getMetadataSchemas, SchemaModel } from './platform'

const parseContext = async ({ req }): Promise<Context> => {
  const context = {
    idToken: req.headers.authorization?.split(' ')[1] || '',
    accessToken: req.headers['reapit-connect-token'] as string,
    apiUrl: 'http://localhost:4000/',
  }

  let metadataSchemas: SchemaModel[] = []

  try {
    metadataSchemas = await getMetadataSchemas(context.accessToken)
  } catch (e) {
    // do nothing
  }

  return {
    ...context,
    metadataSchemas,
  }
}

const start = async () => {
  await ensureTables()

  const app = express()
  app.use(cors())

  const httpServer = http.createServer(app)
  const server = new ExtendedApolloServerExpress({
    schema: await getSchema(),
    context: parseContext,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    schemaCallback: (req) => parseContext({ req }).then(getSchema),
  })

  await server.start()
  server.applyMiddleware({ app })

  const port = 4000
  await new Promise((resolve) => httpServer.listen(port, () => resolve(undefined)))
  console.log(`GraphQL Server is listening at port ${port}`)
}

start().catch(console.error)
