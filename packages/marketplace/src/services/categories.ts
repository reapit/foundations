import { CategoryModelPagedResult } from '@reapit/foundations-ts-definitions'
import { fetcher, setQueryParams } from '@reapit/elements'
import { URLS } from './constants'
import { getPlatformHeaders, logger } from '@reapit/utils'
import { FetchListCommonParams } from './types'
import { reapitConnectBrowserSession } from '../core/connect-session'

export type FetchCategoriesParams = FetchListCommonParams

export const fetchCategoriesApi = async (params: FetchCategoriesParams): Promise<CategoryModelPagedResult> => {
  try {
    const response = await fetcher({
      url: `${URLS.categories}?${setQueryParams(params)}`,
      api: window.reapit.config.platformApiUrl,
      method: 'GET',
      headers: await getPlatformHeaders(reapitConnectBrowserSession, 'latest'),
    })
    return response
  } catch (error) {
    logger(error)
    throw error?.response
  }
}
