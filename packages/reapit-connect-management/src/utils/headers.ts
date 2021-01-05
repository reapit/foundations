import { BASE_HEADERS } from '../constants/api'
import { reapitConnectBrowserSession } from '../core/connect-session'

export const genPlatformHeaders = async () => {
  const connectSession = await reapitConnectBrowserSession.connectSession()
  if (!connectSession || (connectSession && !connectSession.accessToken)) throw new Error('User is not logged in')
  return {
    ...BASE_HEADERS,
    Authorization: (connectSession && (connectSession?.accessToken as string)) ?? '',
  }
}
