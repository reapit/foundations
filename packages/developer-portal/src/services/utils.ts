import { StringMap } from '@/types/core'
import { API_VERSION } from './constants'
import { reapitConnectBrowserSession } from '../core/connect-session'

export const generateHeaders = async () => {
  const connectSession = await reapitConnectBrowserSession.connectSession()
  if (connectSession) {
    return {
      Authorization: `Bearer ${connectSession.accessToken}`,
      'api-version': API_VERSION,
      'Content-Type': 'application/json',
    } as StringMap
  }
  throw new Error('User does not have a valid access token')
}
