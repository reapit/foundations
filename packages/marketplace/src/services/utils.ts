import { API_VERSION } from './constants'
import { getAccessToken } from '@/utils/session'

export const generateHeader = (marketplaceApiKey): StringMap => ({
  'Content-Type': 'application/json',
  'X-Api-Key': marketplaceApiKey,
})

export const initAuthorizedRequestHeaders = async () => ({
  Authorization: `Bearer ${await getAccessToken()}`,
  'api-version': API_VERSION,
  'Content-Type': 'application/json',
})
