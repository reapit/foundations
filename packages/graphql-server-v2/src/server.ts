import express, { Express } from 'express'
import { graphqlHTTP } from 'express-graphql'
import { createSchema, CallBackendArguments } from 'swagger-to-graphql'
import { createPlatformAxiosInstance } from './axios'
import 'isomorphic-fetch'
import graphqlHeader from 'express-graphql-header'
import { API_VERSION } from './constants'
import cors from 'cors'
import * as Sentry from '@sentry/node'
import qs from 'querystring'

if (process.env.SENTRY_DSN) {
  Sentry.init({ dsn: process.env.SENTRY_DSN })
}

const handlePlatformCall = async ({ context, requestOptions }: CallBackendArguments<Request>) => {
  if (!(context.headers as any).authorization) {
    return {
      statusCode: 401,
    }
  }

  console.log(qs.encode(requestOptions.query))
  console.log(`${requestOptions.path}${requestOptions.query ? `?${qs.encode(requestOptions.query)}` : ''}`)

  const axios = createPlatformAxiosInstance()
  try {
    const result = await axios[requestOptions.method](`${requestOptions.path}${requestOptions.query ? `?${qs.encode(requestOptions.query)}` : ''}`, {
      headers: {
        Authorization: (context.headers as any).authorization,
        API_VERSION,
      },
      body: requestOptions.body,
    })

    return result.data
  } catch (e: any) {
    console.error(e)
    return {
      error: e.message,
    }
  }
}

export const bootstrap = async (): Promise<Express> => {
  console.log('Fetching swagger doc...')
  const swaggerResponse = await fetch(`${process.env.PLATFORM_API_BASE_URL}/docs/swagger/agencyCloud_swagger.json`)

  const swagger = await swaggerResponse.json()
  console.log('Starting GQL server')

  const schema = await createSchema({
    swaggerSchema: swagger as any,
    callBackend: handlePlatformCall,
  })
  const app = express()

  if (process.env.SENTRY_DSN) {
    app.use(Sentry.Handlers.requestHandler())
  }

  app.use(cors())
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
