import { logger } from '@reapit/utils'
import { PagedResultDesktopIntegrationTypeModel_ } from '@reapit/foundations-ts-definitions'
import { fetcher, setQueryParams } from '@reapit/elements'
import { URLS } from './constants'
import { generateHeader } from './utils'
import { FetchListCommonParams } from './types'

export type FetchDesktopIntegrationTypesListParams = FetchListCommonParams

export const fetchDesktopIntegrationTypesList = async (
  params: FetchDesktopIntegrationTypesListParams,
): Promise<PagedResultDesktopIntegrationTypeModel_> => {
  try {
    const response = await fetcher({
      url: `${URLS.desktopIntegrationTypes}?${setQueryParams(params)}`,
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
