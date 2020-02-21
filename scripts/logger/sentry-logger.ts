import * as Sentry from '@sentry/browser'

/**
 * Used to send custom logging message to Sentry
 */
export const logger = (error: Error) => {
  if (process.env.NODE_ENV === 'production') {
    Sentry.withScope(scope => {
      scope.setExtra('Error message', JSON.stringify(error))
      Sentry.captureException(error)
    })
  } else {
    console.error(error)
  }
}
