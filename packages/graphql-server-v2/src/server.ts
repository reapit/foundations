import express, { Express } from 'express'
import { graphqlHTTP } from 'express-graphql'
import { createSchema, CallBackendArguments } from 'swagger-to-graphql'
import 'isomorphic-fetch'
import graphqlHeader from 'express-graphql-header'
import { API_VERSION } from './constants'
import cors from 'cors'
import * as Sentry from '@sentry/node'
import { AxiosInstance } from 'axios'
import config from './../config.json'
import swagger from './../swagger.json'

if (config.SENTRY_DSN) {
  Sentry.init({ dsn: config.SENTRY_DSN })
}

const handlePlatformCall =
  (axios: AxiosInstance) =>
  async ({ context, requestOptions }: CallBackendArguments<Request>) => {
    if (!(context.headers as any).authorization) {
      return {
        statusCode: 401,
      }
    }
    try {
      const result = await axios[requestOptions.method](
        `${requestOptions.path}${
          requestOptions.query ? '?' + new URLSearchParams(requestOptions.query as any).toString() : ''
        }`,
        {
          headers: {
            Authorization: (context.headers as any).authorization,
            API_VERSION,
          },
          body: requestOptions.body,
        },
      )

      return result.data
    } catch (e: any) {
      console.error(e)
      return {
        error: e.message,
      }
    }
  }

export const bootstrap = async (axiosInstance: AxiosInstance): Promise<Express> => {
  const schema = await createSchema({
    swaggerSchema: swagger as any,
    callBackend: handlePlatformCall(axiosInstance),
  })
  const app = express()

  if (process.env.SENTRY_DSN) {
    app.use(Sentry.Handlers.requestHandler())
  }

  app.use(cors({
    origin: (requestOrigin, callback) => {
      callback(null, requestOrigin)
    },
    credentials: true,
  }))

  app.use(
    '/graphql',
    graphqlHeader,
    graphqlHTTP({
      schema,
      graphiql: process.env.NODE_ENV === 'development',
    }),
  )

  return app
}
