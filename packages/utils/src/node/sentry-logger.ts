import * as Sentry from '@sentry/node'
import { LeveledLogMethod } from 'winston'
import { serializeError } from 'serialize-error'
import { cleanObject } from '../object'

/**
 * convert any know error properties to object
 * stringtify using JSON.stringtify
 */
export const stringifyError = (err: any) => JSON.stringify(serializeError(err))

/**
 * patch logger.error to send error to sentry
 */

export type WistonLoggerErrorFn = (caller: string, { error: AxiosError, traceId: string, headers: any }) => void
export const createWistonLoggerErrorFn: (loggerError: LeveledLogMethod) => WistonLoggerErrorFn = loggerError => (
  caller,
  { error, traceId, headers },
) =>
  new Promise(resolve => {
    loggerError(caller, { traceId, error: JSON.stringify(error) })

    if (process.env.NODE_ENV === 'development') {
      resolve()
    }

    Sentry.withScope(scope => {
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
        .catch(err => {
          loggerError('logger.error', { error: err, traceId })
        })
    })
  })
