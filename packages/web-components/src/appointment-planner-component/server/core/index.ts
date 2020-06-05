import 'isomorphic-fetch'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import routers from './routers'
import { Context, APIGatewayProxyEvent } from 'aws-lambda'
import serverless from 'serverless-http'
import { errorHandler } from '../../../common/utils/error-handler'
import { traceIdMiddleware, AppResponse, AppRequest } from '@reapit/node-utils'

import * as Sentry from '@sentry/node'
import { logger } from './logger'

if (process.env.NODE_ENV !== 'development') {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    release: process.env.APP_VERSION,
    environment: process.env.APP_ENV,
  })
}

const app = express()

app.use(Sentry.Handlers.requestHandler())
app.use(traceIdMiddleware)
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/', routers)
app.use((err: Error, _req: AppRequest, res: AppResponse) => {
  errorHandler(err, res, _req, 'appointment-planner-error-middle-ware', logger)
})
app.use(Sentry.Handlers.errorHandler())

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

export const appointmentPlannerHandler = async (event: APIGatewayProxyEvent, context: Context) => {
  console.log('appointmentPlannerHandler', { event, context })
  const newHeaders = parseHeadersFromEvent(event)
  event.headers = newHeaders
  console.log('appointmentPlannerHandler', { newHeaders })
  return expressApp(event, context)
}
