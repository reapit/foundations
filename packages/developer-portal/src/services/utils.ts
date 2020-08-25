import { StringMap } from '@/types/core'
import { API_VERSION } from './constants'
import { getAccessToken } from '@/utils/session'

export const generateHeader = async (marketplaceApiKey: string): Promise<StringMap> => {
  return window.reapit.config.appEnv === 'production'
    ? {
        Authorization: `Bearer ${await getAccessToken()}`,
        'Content-Type': 'application/json',
      }
    : {
        'Content-Type': 'application/json',
        'X-Api-Key': marketplaceApiKey,
      }
}

export const generateHeaderWithApiV2 = async (marketplaceApiKey: string): Promise<StringMap> => {
  return window.reapit.config.appEnv === 'production'
    ? ({
        Authorization: `Bearer ${await getAccessToken()}`,
        'Content-Type': 'application/json',
        'api-version': '2',
      } as StringMap)
    : {
        'Content-Type': 'application/json',
        'X-Api-Key': marketplaceApiKey,
        'api-version': '2',
      }
}

export const initAuthorizedRequestHeaders = async (): Promise<StringMap> => ({
  Authorization: `Bearer ${await getAccessToken()}`,
  'api-version': API_VERSION,
  'Content-Type': 'application/json',
})
