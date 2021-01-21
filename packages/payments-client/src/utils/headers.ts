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

export const genPaymentsHeadersSession = (clientCode: string) => {
  const opayoKeys = window.reapit.config.opayo[clientCode]
  const keys = `${opayoKeys.integrationKey}:${opayoKeys.passKey}`
  const encoded = btoa(keys)
  return {
    ...PAYMENTS_HEADERS,
    Authorization: `Basic ${encoded}`,
  }
}

export const genPaymentsUpdateStatusHeaders = (clientCode: string, _eTag: string, session: string) => {
  return {
    ...PAYMENTS_HEADERS,
    'reapit-customer': clientCode || 'SBOX',
    'x-api-key': session,
    'api-version': '2020-01-31',
    'if-match': _eTag,
  }
}
