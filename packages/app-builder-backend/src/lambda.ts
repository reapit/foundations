import 'reflect-metadata'
import { ApolloServer } from 'apollo-server-lambda'
import express from 'express'

import { Context } from './types'
import { ejectAppRoute } from './eject/route'
import { getSchema } from './get-schema'

const createHandler = async () => {
  const schema = await getSchema()

  const server = new ApolloServer({
    schema,
    context: ({ event }): Context => {
      const { authorization } = event.headers
      if (!authorization) {
        throw new Error('Must have the authorization header')
      }
      return {
        idToken: authorization?.split(' ')[1],
        accessToken: event.headers['reapit-connect-token'] as string,
      }
    },
  })

  return server.createHandler({
    expressAppFromMiddleware(middleware) {
      const app = express()
      app.get('/eject/:appId', ejectAppRoute)
      app.use(middleware)
      return app
    },
  })
}

export const handler = async (event, context) => {
  const server = await createHandler()
  // @ts-ignore until https://github.com/apollographql/apollo-server/issues/5592 is resolved
  return server(event, context)
}
