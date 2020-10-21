import { logger } from '@reapit/utils'
import { fetcher, setQueryParams } from '@reapit/elements'
import { NegotiatorModelPagedResult } from '@reapit/foundations-ts-definitions'
import { initAuthorizedRequestHeaders } from './utils'
import { URLS, API_VERSION } from './constants'

export interface FetchNegotiatorsParams {
  pageNumber?: number
  pageSize?: number
  sortBy?: string
  embed?: string[]
  id?: string[]
  officeId?: string[]
  name?: string
}

export const fetchNegotiatorsApi = async (params: FetchNegotiatorsParams): Promise<NegotiatorModelPagedResult> => {
  try {
    const headers = await initAuthorizedRequestHeaders()
    const response = await fetcher({
      url: `${URLS.negotiators}?${setQueryParams(params)}`,
      api: window.reapit.config.platformApiUrl,
      method: 'GET',
      headers: {
        ...headers,
        'api-version': API_VERSION,
      },
    })
    return response
  } catch (error) {
    logger(error)
    throw error?.response
  }
}
