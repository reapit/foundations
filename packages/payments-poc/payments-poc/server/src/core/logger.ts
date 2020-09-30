import winston, { LeveledLogMethod } from 'winston'
import { Request, Response, NextFunction } from 'express'
import morgan from 'morgan'
import uuid from 'uuid'
import { serializeError } from 'serialize-error'
import * as Sentry from '@sentry/node'

export type WistonLoggerErrorFn = (
  caller: string,
  { error: AxiosError, traceId: string, headers: any }
) => void
export type AppResponse = Response
export type AppRequest = Request & {
  traceId: string
}

if (process.env.NODE_ENV !== 'development') {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    release: process.env.APP_VERSION,
    environment: process.env.APP_ENV,
  })
}

export const parseLog = (
  tokens: any,
  req: AppRequest,
  res: AppResponse
): string => {
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

export const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6,
}

export const cleanObject = (obj: Object): { [key: string]: any } => {
  return Object.keys(obj).reduce((newObj, key) => {
    let value = obj[key]
    if (typeof value === 'string') value = value.trim()
    if (value) {
      newObj[key] = value
    }
    return newObj
  }, {})
}

/**
 * convert any know error properties to object
 * stringtify using JSON.stringtify
 */
export const stringifyError = (err: any) => JSON.stringify(serializeError(err))

/**
 * patch logger.error to send error to sentry
 */

export const createWistonLoggerErrorFn: (
  loggerError: LeveledLogMethod
) => WistonLoggerErrorFn = (loggerError) => (
  caller,
  { error, traceId, headers }
) =>
  new Promise((resolve) => {
    loggerError(caller, { traceId, error: error })
    console.log({ traceId }, JSON.stringify(error, null, 2))

    if (process.env.NODE_ENV === 'development') {
      resolve()
    }

    Sentry.withScope((scope) => {
      scope.setExtra(
        'Error',
        cleanObject({
          caller,
          traceId,
          headers,
          error,
        })
      )
      Sentry.captureException(error)
      Sentry.flush(2000)
        .then(resolve)
        .catch((err) => {
          loggerError('logger.error', { error: err, traceId })
        })
    })
  })

export const logger = winston.createLogger({
  format: winston.format.combine(winston.format.json()),
  defaultMeta: { service: 'cloud-payments-server' },
  exitOnError: false,
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(winston.format.json()),
    }),
  ],
})

logger.error = createWistonLoggerErrorFn(logger.error) as LeveledLogMethod

export const morganLogging = morgan(parseLog)

export const traceIdMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Object.defineProperty(req, 'traceId', {
    value: uuid.v4(),
  })
  next()
}

