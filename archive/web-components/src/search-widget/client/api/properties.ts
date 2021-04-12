import { fetcher } from '../../../common/utils/fetcher-client'
import { getClientHeaders } from '../../../common/utils/get-client-headers'
import { PickedPagedResultPropertyModel_ } from '../../types'

export type GetPropertiesType = {
  keywords?: string
  isRental?: boolean
  apiKey: string
  customerId: string
  pageNumber?: number
  bedroomsFrom?: number
  bedroomsTo?: number
  priceFrom?: number
  priceTo?: number
  sortBy?: string
  propertyType?: string
  addedIn?: string
}

export const getUrlQuery = (params: Omit<GetPropertiesType, 'apiKey' | 'customerId'> = { pageNumber: 1 }) => {
  const {
    keywords = '',
    isRental,
    pageNumber,
    bedroomsFrom = 0,
    bedroomsTo = 0,
    priceFrom = 0,
    priceTo = 0,
    sortBy = '',
    propertyType = '',
  } = params

  const url = new URL(`${process.env.WEB_COMPONENT_API_BASE_URL_SEARCH_WIDGET}/properties`)
  url.searchParams.append('sellingStatus', 'forSale')
  url.searchParams.append('sellingStatus', 'underOffer')
  url.searchParams.append('InternetAdvertising', 'true')
  url.searchParams.append('PageSize', '8')
  url.searchParams.append('pageNumber', String(pageNumber))
  url.searchParams.append('Address', keywords)
  if (isRental) {
    url.searchParams.append('marketingMode', 'letting')
    url.searchParams.append('marketingMode', 'sellingAndLetting')
  } else {
    url.searchParams.append('marketingMode', 'selling')
    url.searchParams.append('marketingMode', 'sellingAndLetting')
  }
  // bedrooms
  if (bedroomsFrom > 0) {
    url.searchParams.append('bedroomsFrom', String(bedroomsFrom))
  }
  if (bedroomsTo > 0) {
    url.searchParams.append('bedroomsTo', String(bedroomsTo))
  }
  // sortBy
  url.searchParams.append('sortBy', sortBy)
  // price range
  if (isRental) {
    priceFrom > 0 && url.searchParams.append('rentFrom', String(priceFrom))
    priceTo > 0 && url.searchParams.append('rentTo', String(priceTo))
  } else {
    priceFrom > 0 && url.searchParams.append('priceFrom', String(priceFrom))
    priceTo > 0 && url.searchParams.append('priceTo', String(priceTo))
  }
  //propertyType
  url.searchParams.append('propertyType', propertyType)

  return String(url)
}

export const getProperties = async (
  params: GetPropertiesType = { pageNumber: 1, apiKey: '', customerId: '' },
): Promise<PickedPagedResultPropertyModel_ | undefined> => {
  const { apiKey, customerId, ...otherParams } = params
  return fetcher<PickedPagedResultPropertyModel_, null>({
    url: getUrlQuery(otherParams),
    headers: getClientHeaders({ apiKey, customerId }),
  })
}
