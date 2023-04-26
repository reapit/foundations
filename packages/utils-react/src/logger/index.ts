import * as Sentry from '@sentry/react'
import { ReapitConnectSession } from '@reapit/connect-session'

/**
 * Used to send custom logging message to Sentry
 */
export const logger = (error: Error, connectSession?: ReapitConnectSession | null) => {
  if (process.env.NODE_ENV === 'production') {
    Sentry.setContext('Error', {
      message: error.message ?? 'No error message caputured',
      page: window.location.href,
      identity: connectSession?.loginIdentity ?? 'No Session Logged',
      permissionGroups: connectSession?.loginIdentity.groups ?? [],
      accessToken: connectSession?.accessToken ?? 'No Access Token Logged',
      idToken: connectSession?.idToken ?? 'No Id Token Logged',
    })
    if (connectSession) {
      Sentry.setUser({
        email: connectSession?.loginIdentity.email ?? 'No email logged',
        username: connectSession?.loginIdentity.name ?? 'No name logged',
        id: connectSession?.loginIdentity.clientId ?? 'No client id logged',
      })
    }
    Sentry.captureException(error)
  } else {
    console.error(error.message)
  }
}
