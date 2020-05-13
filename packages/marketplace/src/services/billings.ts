import { fetcher, setQueryParams } from '@reapit/elements'
import { generateHeader, URLS } from '@/constants/api'
import { logger } from 'logger'

export interface FetchMonthlyBillingParams {
  applicationIds: string[]
  month: string
}

export const fetchMonthlyBilling = async (params: FetchMonthlyBillingParams) => {
  try {
    const { month, applicationIds } = params
    const response = await fetcher({
      url: `${URLS.trafficEvents}/billing/${month}?${setQueryParams({ applicationId: applicationIds })}`,
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
