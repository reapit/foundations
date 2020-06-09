import 'isomorphic-fetch'
import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import router from './router'
import { Context, APIGatewayProxyEvent } from 'aws-lambda'
import serverless from 'serverless-http'
import { errorHandler } from '../../../common/utils/error-handler'
import { createParseLog, traceIdMiddleware } from '@reapit/node-utils'
import { logger } from './logger'
import morgan from 'morgan'

import * as Sentry from '@sentry/node'

if (process.env.NODE_ENV !== 'development') {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    release: process.env.APP_VERSION,
    environment: process.env.APP_ENV,
  })
}

const app = express()
const parseLog = createParseLog(logger)
const morganLogging = morgan(parseLog)

app.use(Sentry.Handlers.requestHandler())
app.use(traceIdMiddleware)
app.use(morganLogging)
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/', router)
app.use(Sentry.Handlers.errorHandler())
app.use((err: Error, req: Request, res: Response) => {
  errorHandler(err, res, req, 'search-widget-error-handler', logger)
})

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

export const searchWidgetHandler = async (event: APIGatewayProxyEvent, context: Context) => {
  console.log('searchWidgetHandler', { event, context })
  const newHeaders = parseHeadersFromEvent(event)
  event.headers = newHeaders
  console.log('searchWidgetHandler', { newHeaders })
  return expressApp(event, context)
}
