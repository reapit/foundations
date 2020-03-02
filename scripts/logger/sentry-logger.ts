/* Sentry currently only work for Chrome, add polyfill for other browsers */
import 'error-polyfill'
import * as Sentry from '@sentry/browser'

/**
 * Used to send custom logging message to Sentry
 */
export const logger = (error: Error) => {
  if (process.env.NODE_ENV === 'production') {
    Sentry.withScope(scope => {
      scope.setExtra('Error', { error: JSON.stringify(error) })
      Sentry.captureException(error)
    })
  } else {
    console.error(error)
  }
}
