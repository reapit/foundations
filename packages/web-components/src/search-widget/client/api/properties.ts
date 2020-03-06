import { fetcher } from '../../../common/utils/fetcher-client'
import { getClientHeaders } from '../../../common/utils/get-client-headers'
import { PagedResultPropertyModel_ } from '@reapit/foundations-ts-definitions'
import { API_BASE_URL } from './constants'

export const getPropertiesForSale = async (
  keywords: string,
  apiKey: string,
): Promise<PagedResultPropertyModel_ | undefined> => {
  const url = new URL(`${API_BASE_URL}/properties`)
  url.searchParams.append('SellingStatuses', ['forSale', 'underOffer'].join(','))
  url.searchParams.append('InternetAdvertising', 'true')
  url.searchParams.append('PageSize', '8')
  url.searchParams.append('marketingMode', ['selling', 'sellingAndLetting'].join(','))
  url.searchParams.append('Address', keywords)

  return fetcher<PagedResultPropertyModel_, null>({
    url: String(url),
    headers: getClientHeaders(apiKey),
  })
}

export const getPropertiesToRent = async (
  keywords: string,
  apiKey: string,
): Promise<PagedResultPropertyModel_ | undefined> => {
  const url = new URL(`${API_BASE_URL}/properties`)
  url.searchParams.append('SellingStatuses', ['forSale', 'underOffer'].join(','))
  url.searchParams.append('InternetAdvertising', 'true')
  url.searchParams.append('PageSize', '8')
  url.searchParams.append('marketingMode', ['letting', 'sellingAndLetting'].join(','))
  url.searchParams.append('Address', keywords)

  return fetcher<PagedResultPropertyModel_, null>({
    url: String(url),
    headers: getClientHeaders(apiKey),
  })
}
