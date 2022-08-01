import 'reflect-metadata'
import express from 'express'
import http from 'http'
import cors from 'cors'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'

import { ExtendedApolloServerExpress } from './extended-apollo-server'
import { Context } from './types'
import { ensureTables } from './ddb'
import { getSchema } from './get-schema'
import { CustomEntity } from './entities/custom-entity'
import { getCustomEntities } from './custom-entites'
import { MetadataSchemaType } from './utils/extract-metadata'
import { createMarketplaceAppLoader } from './platform/apps'

const parseContext = async ({ req }): Promise<Context> => {
  const accessToken = req.headers['reapit-connect-token']
  const context = {
    idToken: req.headers.authorization?.split(' ')[1] || '',
    accessToken,
    apiUrl: 'http://localhost:4000/',
    webUrl: req.headers.origin,
    appId: req.headers['app-id'],
  }

  const marketplaceAppLoader = createMarketplaceAppLoader(accessToken)

  let customEntities: CustomEntity[] = []

  if (context.appId) {
    customEntities = await getCustomEntities(context.appId)
  }

  const metadataCache = {} as Record<string, any>
  return {
    ...context,
    customEntities,
    operationMetadata: {} as Record<MetadataSchemaType, any>,
    getMarketplaceApp: async (appId: string) => {
      return marketplaceAppLoader.load(appId)
    },
    storeCachedMetadata: (typeName: MetadataSchemaType, id: string, metadata: any) => {
      metadataCache[`${typeName}-${id}`] = metadata
    },
    getCachedMetadata: (typeName: MetadataSchemaType, id: string, key: string) =>
      metadataCache[`${typeName}-${id}`]?.[key],
  }
}

const start = async () => {
  await ensureTables()

  const app = express()

  app.disable('x-powered-by')
  app.use(cors())
  app.use(express.json({ limit: '50mb' }))

  const httpServer = http.createServer(app)
  const server = new ExtendedApolloServerExpress({
    schema: await getSchema(),
    context: parseContext,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    schemaCallback: (req) => parseContext({ req }).then(getSchema),
    formatError: (error) => {
      console.log(error)
      return error
    },
  })

  await server.start()
  server.applyMiddleware({ app })

  const port = 4000
  await new Promise((resolve) => httpServer.listen(port, () => resolve(undefined)))
  console.log(`GraphQL Server is listening at port ${port}`)
}

start().catch(console.error)
