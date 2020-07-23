import { StringMap } from '@/types/core'
import { API_VERSION } from './constants'
// import { getAccessToken } from '@/utils/session'
// FIXME(auth): get acces token in auth field, fetch web hook
import { reapitConnectBrowserSession } from '@/core/connect-session'

export const generateHeader = (marketplaceApiKey): StringMap => ({
  'Content-Type': 'application/json',
  'X-Api-Key': marketplaceApiKey,
})

export const generateHeaderWithApiV2 = (marketplaceApiKey): StringMap => ({
  ...generateHeader(marketplaceApiKey),
  'api-version': '2',
})

// FIXME: remove repait connect
// need to access token
// able to fetch webhook

export const initAuthorizedRequestHeaders = async () => {
  const session = await reapitConnectBrowserSession.connectSession()
  if (session && session.accessToken) {
    return {
      Authorization: `Bearer ${session.accessToken}`,
      'api-version': API_VERSION,
      'Content-Type': 'application/json',
      // debug: ,
    }
  }

  throw new Error('Cant get access token')
}
