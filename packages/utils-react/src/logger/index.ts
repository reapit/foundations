/* Sentry currently only work for Chrome, add polyfill for other browsers */
import 'error-polyfill'
import * as Sentry from '@sentry/react'
import { ReapitConnectSession } from '@reapit/connect-session'

/**
 * Used to send custom logging message to Sentry
 */
export const logger = (error: Error, connectSession?: ReapitConnectSession | null) => {
  // if (process.env.NODE_ENV === 'production') {
  console.log('here')
  Sentry.withScope((scope) => {
    scope.setExtra('Error', {
      message: error.message ?? 'No error message caputured',
      page: window.location.href,
      connectSession: connectSession?.loginIdentity ?? 'No Session Logged',
      permissionGroups: connectSession?.loginIdentity.groups ?? [],
    })
    // if (connectSession) {
    //   Sentry.setUser({
    //     email: connectSession.loginIdentity.email ?? 'No email logged',
    //     username: connectSession.loginIdentity.name ?? 'No name logged',
    //     id: connectSession.loginIdentity.clientId ?? 'No client id logged',
    //   })
    // }
    Sentry.captureException(error)
  })
  // } else {
  //   console.error(error.message)
  // }
}
