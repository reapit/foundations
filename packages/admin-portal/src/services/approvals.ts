import { PagedResultApprovalModel_ } from '@reapit/foundations-ts-definitions'
import { fetcher, setQueryParams } from '@reapit/elements'
import { URLS } from './constants'
import { generateHeader } from './utils'
import { logger } from '@reapit/utils'
import { FetchListCommonParams } from './types'

export type FetchApprovalsListParams = FetchListCommonParams
/*
 * TODOME(approvalsDataFetch)
 * throw error
 */

export const fetchApprovalsList = async (params: FetchApprovalsListParams): Promise<PagedResultApprovalModel_> => {
  try {
    const response = await fetcher({
      url: `${URLS.approvals}?${setQueryParams(params)}`,
      api: window.reapit.config.marketplaceApiUrl,
      method: 'GET',
      headers: generateHeader(window.reapit.config.marketplaceApiKey),
    })
    return response
  } catch (error) {
    logger(error)
    throw new Error(error)
  }
}
