import { API_HEADERS, PAYMENTS_HEADERS } from '../constants/api'
import { reapitConnectBrowserSession } from '../core/connect-session'

export const genPlatformHeaders = async () => {
  const connectSession = await reapitConnectBrowserSession.connectSession()
  if (!connectSession) throw new Error('User is not logged in')
  return {
    ...API_HEADERS,
    Authorization: `Bearer ${connectSession?.accessToken}`,
  }
}

export const genPaymentsHeaders = async () => {
  const connectSession = await reapitConnectBrowserSession.connectSession()
  if (!connectSession) throw new Error('User is not logged in')
  const opayoKeys = window.reapit.config.opayo[connectSession.loginIdentity.clientId as string]
  const keys = `${opayoKeys.integrationKey}:${opayoKeys.passKey}`
  const encoded = btoa(keys)
  return {
    ...PAYMENTS_HEADERS,
    Authorization: `Basic ${encoded}`,
  }
}
