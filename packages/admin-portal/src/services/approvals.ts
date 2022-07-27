import { ApprovalModelPagedResult } from '@reapit/foundations-ts-definitions'
import { fetcher, setQueryParams } from '@reapit/utils-common'
import { URLS } from './constants'
import { getPlatformHeaders, logger } from '@reapit/utils-react'
import { FetchListCommonParams } from './types'
import { reapitConnectBrowserSession } from '../core/connect-session'

export type FetchApprovalsListParams = FetchListCommonParams

export const fetchApprovalsList = async (
  params: FetchApprovalsListParams,
): Promise<ApprovalModelPagedResult | void> => {
  try {
    const headers = await getPlatformHeaders(reapitConnectBrowserSession, 'latest')
    if (headers) {
      return fetcher({
        url: `${URLS.approvals}?${setQueryParams(params)}`,
        api: window.reapit.config.platformApiUrl,
        method: 'GET',
        headers,
      })
    }
  } catch (error) {
    logger(error as Error)
    throw error
  }
}
