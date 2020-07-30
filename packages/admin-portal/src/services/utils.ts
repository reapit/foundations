import { StringMap } from '@/types/core'
import { API_VERSION } from './constants'
import { reapitConnectBrowserSession } from '@/core/connect-session'

export const generateHeader = (marketplaceApiKey): StringMap => ({
  'Content-Type': 'application/json',
  'X-Api-Key': marketplaceApiKey,
})

export const generateHeaderWithApiV2 = (marketplaceApiKey): StringMap => ({
  ...generateHeader(marketplaceApiKey),
  'api-version': '2',
})

export const initAuthorizedRequestHeaders = async () => {
  const session = await reapitConnectBrowserSession.connectSession()
  const bearerToken = session ? session.accessToken : ''

  return {
    Authorization: `Bearer ${bearerToken}`,
    'api-version': API_VERSION,
    'Content-Type': 'application/json',
  }
}
