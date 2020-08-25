import { StringMap } from '@/types/core'
import { API_VERSION } from './constants'
import { reapitConnectBrowserSession } from '@/core/connect-session'

export const generateHeader = async (marketplaceApiKey: string): Promise<StringMap> => {
  return window.reapit.config.appEnv === 'production'
    ? await initAuthorizedRequestHeaders()
    : {
        'Content-Type': 'application/json',
        'X-Api-Key': marketplaceApiKey,
      }
}

export const generateHeaderWithApiV2 = async (marketplaceApiKey: string): Promise<StringMap> => {
  const headers =
    window.reapit.config.appEnv === 'production'
      ? await initAuthorizedRequestHeaders()
      : {
          'Content-Type': 'application/json',
          'X-Api-Key': marketplaceApiKey,
        }
  return {
    ...headers,
    'api-version': '2',
  }
}

export const initAuthorizedRequestHeaders = async () => {
  const session = await reapitConnectBrowserSession.connectSession()
  if (session && session.accessToken) {
    return {
      Authorization: `Bearer ${session.accessToken}`,
      'api-version': API_VERSION,
      'Content-Type': 'application/json',
    }
  }

  throw new Error('Cant get access token')
}
