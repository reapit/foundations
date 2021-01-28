import { API_HEADERS } from '../constants/api'
import { reapitConnectBrowserSession } from '../core/connect-session'

export const genPlatformHeaders = async () => {
  const connectSession = await reapitConnectBrowserSession.connectSession()
  if (!connectSession) throw new Error('User is not logged in')
  return {
    ...API_HEADERS,
    Authorization: `Bearer ${connectSession?.accessToken}`,
  }
}
