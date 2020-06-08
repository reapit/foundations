import * as Sentry from '@sentry/node'
import { LeveledLogMethod } from 'winston'
import { serializeError } from 'serialize-error'

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
) => {
  loggerError(caller, { traceId, error: error?.response?.data, headers: error?.response?.headers })

  if (process.env.NODE_ENV !== 'development') {
    Sentry.withScope(scope => {
      scope.setExtra('Error', {
        caller,
        traceId,
        headers,
        error,
      })
      Sentry.captureException(error)
    })
  }
}
