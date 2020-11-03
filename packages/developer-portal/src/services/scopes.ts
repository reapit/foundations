import { ScopeModel } from '@reapit/foundations-ts-definitions'
import { fetcher } from '@reapit/elements'
import { URLS } from './constants'
import { generateHeaders } from './utils'
import { logger } from '@reapit/utils'

export const fetchScopeListAPI = async (): Promise<ScopeModel[]> => {
  try {
    const response = await fetcher({
      url: `${URLS.scopes}`,
      api: window.reapit.config.platformApiUrl,
      method: 'GET',
      headers: await generateHeaders(),
    })
    return response
  } catch (error) {
    logger(error)
    throw error?.response
  }
}
