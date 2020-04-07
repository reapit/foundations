import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'
import uuid from 'uuid/v4'
import morgan from 'morgan'
import health from './routes/health'
import webComponentsConfig from './routes/web-components-config'
import logger from './logger'

if (process.env.NODE_ENV === 'development') {
  const configs = require(path.resolve(__dirname, '..', 'config.json'))
  for (const k in configs) {
    process.env[k] = configs[k]
  }
}

const app = express()
const cors = require('cors')

export type AppResponse = express.Response
export type AppRequest = express.Request & {
  traceId: string
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

app.listen({ port: process.env.PORT || 3000 }, () => {
  console.log(`🚀 Server ready at http://localhost:${process.env.PORT || 3000}`)
})
