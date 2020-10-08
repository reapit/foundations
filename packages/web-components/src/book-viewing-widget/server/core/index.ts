import 'isomorphic-fetch'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import routers from './routers'
import { Context, APIGatewayProxyEvent } from 'aws-lambda'
import serverless from 'serverless-http'
import { traceIdMiddleware, createParseLog } from '@reapit/node-utils'
import morgan from 'morgan'

import * as Sentry from '@sentry/node'
import { logger } from './logger'

const parseLog = createParseLog(logger)
const morganLogging = morgan(parseLog)

if (process.env.NODE_ENV !== 'development') {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    release: process.env.APP_VERSION,
    environment: process.env.APP_ENV,
  })
}

const app = express()

app.use(traceIdMiddleware)
app.use(morganLogging)
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/', routers)

const expressApp = serverless(app)

export const parseHeadersFromEvent = (event: APIGatewayProxyEvent) => {
  const authorization = event?.requestContext?.authorizer?.authorization?.trim()
  const newHeaders = {
    ...event.headers,
    ...event?.requestContext?.authorizer,
    authorization: `Bearer ${authorization}`,
  } as { [name: string]: string }
  return newHeaders
}

export const bookViewingHandler = async (event: APIGatewayProxyEvent, context: Context) => {
  console.log('bookViewingHandler', { event, context })
  const newHeaders = parseHeadersFromEvent(event)
  event.headers = newHeaders

  console.log('bookViewingHandler', { newHeaders })
  return expressApp(event, context)
}
