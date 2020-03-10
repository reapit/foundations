import { DEFAULT_HEADERS } from './constants'

export const getClientHeaders = (apiKey: string = '') => {
  return {
    ...DEFAULT_HEADERS,
    'x-api-key': apiKey,
  }
}
