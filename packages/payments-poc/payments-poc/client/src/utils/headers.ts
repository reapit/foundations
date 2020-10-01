import { API_HEADERS, PAYMENTS_HEADERS } from '../constants/api'
import { reapitConnectBrowserSession } from '../core/connect-session'

export const genPlatformHeaders = async () => {
  const connectSession = await reapitConnectBrowserSession.connectSession()
  return {
    ...API_HEADERS,
    Authorization: connectSession?.accessToken
  }
}

export const genPaymentsHeaders = async () => {
  const connectSession = await reapitConnectBrowserSession.connectSession()
  return {
    ...PAYMENTS_HEADERS,
    Authorization: connectSession?.idToken
  }
}