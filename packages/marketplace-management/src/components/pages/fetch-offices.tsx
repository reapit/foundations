import { fetcher, setQueryParams } from '@reapit/utils-common'
import { getPlatformHeaders, logger } from '@reapit/utils-react'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { FetchError } from '@reapit/utils-common'
import { OfficeModelPagedResult } from '@reapit/foundations-ts-definitions'

export type FetchOfficeListParams = {
  name?: string
  company?: string
  isInactive?: boolean
  registeredFrom?: string
  registeredTo?: string
  status?: string
  pageNumber?: number
  pageSize?: number
}

export const fetchOfficeList = async (params: FetchOfficeListParams): Promise<OfficeModelPagedResult | void> => {
  try {
    const headers = await getPlatformHeaders(reapitConnectBrowserSession, 'latest')
    if (headers) {
      return fetcher({
        url: `/offices/?${setQueryParams(params)}`,
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
