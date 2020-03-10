import { fetcher } from '../../../common/utils/fetcher-client'
import { getClientHeaders } from '../../../common/utils/get-client-headers'
import { PagedResultPropertyModel_ } from '@reapit/foundations-ts-definitions'

export const getUrlQuery = (isRental: boolean, keywords: string) => {
  const url = new URL(`${process.env.WEB_COMPONENT_API_BASE_URL_SEARCH_WIDGET}/properties`)
  url.searchParams.append('SellingStatuses', ['forSale', 'underOffer'].join(','))
  url.searchParams.append('InternetAdvertising', 'true')
  url.searchParams.append('PageSize', '8')
  url.searchParams.append('Address', keywords)
  if (isRental) {
    url.searchParams.append('marketingMode', ['letting', 'sellingAndLetting'].join(','))
  } else {
    url.searchParams.append('marketingMode', ['selling', 'sellingAndLetting'].join(','))
  }
  return String(url)
}

export const getProperties = async (
  keywords: string,
  isRental: boolean,
  apiKey: string,
): Promise<PagedResultPropertyModel_ | undefined> => {
  return fetcher<PagedResultPropertyModel_, null>({
    url: getUrlQuery(isRental, keywords),
    headers: getClientHeaders(apiKey),
  })
}
