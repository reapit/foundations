import { logger } from '@reapit/utils'
import { fetcher, setQueryParams } from '@reapit/elements'
import { PagedResultNegotiatorModel_ } from '@reapit/foundations-ts-definitions'
import { initAuthorizedRequestHeaders } from './utils'
import { URLS } from './constants'

export interface FetchNegotiatorsParams {
  pageNumber?: number
  pageSize?: number
  sortBy?: string
  embed?: string[]
  id?: string[]
  officeId?: string[]
  name?: string
}

export const fetchNegotiators = async (params: FetchNegotiatorsParams): Promise<PagedResultNegotiatorModel_> => {
  try {
    const headers = await initAuthorizedRequestHeaders()
    const response = await fetcher({
      url: `${URLS.negotiators}?${setQueryParams(params)}`,
      api: window.reapit.config.platformApiUrl,
      method: 'GET',
      headers,
    })
    return response
  } catch (error) {
    logger(error)
    throw new Error(error)
  }
}
