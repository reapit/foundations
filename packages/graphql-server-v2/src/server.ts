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

    const apiContext = JSON.parse(decodeURIComponent(context.headers['x-apigateway-event']))
    const authorizer = apiContext.requestContext.authorizer

    try {
      const result = await axios[requestOptions.method](
        `http://${requestOptions.path.split('/').join('')}-service-internal.local${
          requestOptions.query ? '?' + new URLSearchParams(requestOptions.query as any).toString() : ''
        }`,
        {
          headers: {
            API_VERSION,
            'X-Forwarded-For': 'platform.reapit.cloud',
            'X-Forwarded-Host': 'platform.reapit.cloud',
            'X-Forwarded-Server': 'platform.reapit.cloud',
            'cognito-application-id': authorizer.appId,
            'cognito-subscriber-id': authorizer.user,
            'find-sec-key': config.SEC_KEY,
            'gateway-request-id': apiContext.requestContext.requestId,
            'reapit-app-developer-id': authorizer['app-developer-id'],
            'reapit-application-id': authorizer.internalAppId,
            'reapit-client-id': authorizer.clientId,
            'reapit-developer': authorizer.developerRequest,
            'reapit-groups': authorizer['reapit-groups'],
            'reapit-office-id': authorizer.officeId,
            'reapit-scopes': authorizer['reapit-scopes'],
            'reapit-user-id': authorizer.userId,
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

  app.use(
    cors({
      origin: (requestOrigin, callback) => {
        callback(null, requestOrigin)
      },
      credentials: true,
    }),
  )
  app.use(
    '/',
    graphqlHeader,
    graphqlHTTP({
      schema,
      graphiql: process.env.NODE_ENV === 'development',
    }),
  )

  return app
}
