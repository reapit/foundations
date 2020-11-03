import { ApprovalModelPagedResult } from '@reapit/foundations-ts-definitions'
import { fetcher, setQueryParams } from '@reapit/elements'
import { URLS } from './constants'
import { generateHeaders } from './utils'
import { logger } from '@reapit/utils'
import { FetchListCommonParams } from './types'

export type FetchApprovalsListParams = FetchListCommonParams

export const fetchApprovalsList = async (params: FetchApprovalsListParams): Promise<ApprovalModelPagedResult> => {
  try {
    const response = await fetcher({
      url: `${URLS.approvals}?${setQueryParams(params)}`,
      api: window.reapit.config.platformApiUrl,
      method: 'GET',
      headers: await generateHeaders(),
    })
    return response
  } catch (error) {
    logger(error)
    throw new Error(error)
  }
}
