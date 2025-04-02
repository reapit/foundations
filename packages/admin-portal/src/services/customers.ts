import { Marketplace } from '@reapit/foundations-ts-definitions'
import { getPlatformHeaders, logger } from '@reapit/utils-react'
import { fetcher, FetchError, setQueryParams } from '@reapit/utils-common'
import { reapitConnectBrowserSession } from '../core/connect-session'
import { URLS } from './constants'
import { FetchListCommonParams } from './types'

export type CustomerListParams = FetchListCommonParams & {
  name?: string
}

export const fetchCustomersList = async (
  params: CustomerListParams,
): Promise<Marketplace.CustomerModelPagedResult | void> => {
  try {
    const headers = await getPlatformHeaders(reapitConnectBrowserSession, 'latest')
    if (headers) {
      return fetcher({
        url: `${URLS.customers}/?${setQueryParams(params)}`,
        api: process.env.platformApiUrl,
        method: 'GET',
        headers,
      })
    }
  } catch (error) {
    logger(error as FetchError)
    throw error
  }
}
