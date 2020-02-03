import * as Sentry from '@sentry/browser'

/**
 * Used to send custom logging message to Sentry
 */
export const logger = (error: Error) => {
  if (process.env.NODE_ENV === 'production') {
    Sentry.captureException(error)
  } else {
    console.error(error)
  }
}
