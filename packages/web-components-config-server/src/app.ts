import express from 'express'
import bodyParser from 'body-parser'
import uuid from 'uuid/v4'
import morgan from 'morgan'
import health from './routes/health'
import webComponentsConfig from './routes/web-components-config'
import logger from './logger'
import * as Sentry from '@sentry/node'

const app = express()
const cors = require('cors')

export type AppResponse = express.Response
export type AppRequest = express.Request & {
  traceId: string
}

if (process.env.NODE_ENV !== 'development') {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    release: process.env.APP_VERSION,
    environment: process.env.APP_ENV,
  })
}

export const parseLog = (tokens, req: AppRequest, res: AppResponse): string => {
  const log = {
    traceId: req.traceId,
    method: tokens.method(req, res),
    endpoint: tokens.url(req, res),
    status: tokens.status(req, res),
    contentLength: String(tokens.res(req, res, 'content-length')),
    responseTime: tokens['response-time'](req, res),
    reqHeader: JSON.stringify(req.headers),
    reqBody: JSON.stringify(req.body),
  }

  logger.info(log)

  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'),
    '-',
    tokens['response-time'](req, res),
    'ms',
  ].join(' ')
}

const morganLogging = morgan(parseLog)

export const traceIdMiddleware = (req, res, next) => {
  const traceId = uuid()
  req.traceId = traceId
  next()
}

app.use(bodyParser.json())
app.use(traceIdMiddleware)
app.use(morganLogging)
app.use(cors({ origin: true }))
app.use('/v1/health', health)
app.use('/v1/web-components-config', webComponentsConfig)

export default app
