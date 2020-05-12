import { fetcher, setQueryParams } from '@reapit/elements'
import { generateHeader, URLS } from '@/constants/api'
import { logger } from 'logger'

export interface FetchApprovalsListParams {
  pageNumber: number
  pageSize: number
}

export const fetchApprovalsList = async (params: FetchApprovalsListParams) => {
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
