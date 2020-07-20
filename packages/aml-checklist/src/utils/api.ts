import { CONTACTS_HEADERS, API_VERSION } from '../constants/api'
import { reapitConnectBrowserSession } from '@/core/connect-session'

export const initAuthorizedRequestHeaders = async () => {
  const session = await reapitConnectBrowserSession.connectSession()
  const bearerToken = session ? session.accessToken : ''

  return {
    ...CONTACTS_HEADERS,
    Authorization: `Bearer ${bearerToken}`,
    'api-version': API_VERSION,
  }
}
