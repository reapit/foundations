import { AxiosError } from 'axios'
import * as Sentry from '@sentry/node'
import { LeveledLogMethod } from 'winston'
import { serializeError } from 'serialize-error'
import { cleanObject } from '@reapit/utils-common'

/**
 * convert any know error properties to object
 * stringtify using JSON.stringtify
 */
export const stringifyError = (err: any) => JSON.stringify(serializeError(err))

/**
 * patch logger.error to send error to sentry
 */

export interface LoggerError {
  error: AxiosError
  traceId: string
  headers: any
}

export type WistonLoggerErrorFn = (caller: string, error: LoggerError) => void
export const createWistonLoggerErrorFn: (loggerError: LeveledLogMethod) => WistonLoggerErrorFn =
  (loggerError) =>
  (caller, { error, traceId, headers }) =>
    new Promise((resolve) => {
      loggerError(caller, { traceId, error: error })
      console.log({ traceId }, JSON.stringify(error, null, 2))

      if (process.env.NODE_ENV === 'development') {
        resolve(true)
      }

      Sentry.withScope((scope) => {
        scope.setExtra(
          'Error',
          cleanObject({
            caller,
            traceId,
            headers,
            error,
          }),
        )
        Sentry.captureException(error)
        Sentry.flush(2000)
          .then(resolve)
          .catch((err) => {
            loggerError('logger.error', { error: err, traceId })
          })
      })
    })
