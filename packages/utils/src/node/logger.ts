import winston, { LeveledLogMethod, Logger } from 'winston'
import { v4 as uuid } from 'uuid'
import { createWistonLoggerErrorFn } from './sentry-logger'
import express from 'express'

export type AppResponse = express.Response
export type AppRequest = express.Request & {
  traceId?: string
}

/**
 * create fn
 * forward log to wiston
 */
export const createParseLog = (logger: Logger) => (tokens, req: AppRequest, res: AppResponse): string => {
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

export const traceIdMiddleware = (req, res, next) => {
  const traceId = uuid()
  req.traceId = traceId
  next()
}

export const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6,
}

export const createLogger = (service: string) => {
  const logger = winston.createLogger({
    format: winston.format.combine(winston.format.json()),
    defaultMeta: { service },
    exitOnError: false,
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(winston.format.json()),
      }),
    ],
  })

  logger.error = createWistonLoggerErrorFn(logger.error) as LeveledLogMethod
  return logger
}
