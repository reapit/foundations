import { logger } from '@reapit/utils'
import { DesktopIntegrationTypeModelPagedResult } from '@reapit/foundations-ts-definitions'
import { fetcher, setQueryParams } from '@reapit/elements'
import { URLS } from './constants'
import { generateHeader } from './utils'
import { FetchListCommonParams } from './types'

export type FetchDesktopIntegrationTypesParams = FetchListCommonParams

export const fetchDesktopIntegrationTypesApi = async (
  params: FetchDesktopIntegrationTypesParams,
): Promise<DesktopIntegrationTypeModelPagedResult> => {
  try {
    const response = await fetcher({
      url: `${URLS.desktopIntegrationTypes}?${setQueryParams(params)}`,
      api: window.reapit.config.marketplaceApiUrl,
      method: 'GET',
      headers: await generateHeader(window.reapit.config.marketplaceApiKey),
    })
    return response
  } catch (error) {
    logger(error)
    throw error?.response
  }
}
