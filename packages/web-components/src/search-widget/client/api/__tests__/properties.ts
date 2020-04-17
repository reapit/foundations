import { fetcher } from '../../../../common/utils/fetcher-client'
import { propertiesStub } from '../../../server/api/__stubs__/properties'
import { getProperties, GetPropertiesType, getUrlQuery } from '../properties'
import { getClientHeaders } from '../../../../common/utils/get-client-headers'

jest.mock('../../../../common/utils/fetcher-client')

describe('properties client API', () => {
  it('should correctly return a URL query for a rental', () => {
    process.env.WEB_COMPONENT_API_BASE_URL_SEARCH_WIDGET = 'http://localhost:3000'
    const params: GetPropertiesType = {
      apiKey: 'apiKey',
      keywords: 'london',
      pageNumber: 1,
      isRental: true,
      bedroomsFrom: 1,
      bedroomsTo: 4,
      priceFrom: 10000,
      priceTo: 200000,
      sortBy: 'price',
      propertyType: 'house',
    }
    const expected =
      'http://localhost:3000/properties?SellingStatuses=forSale%2CunderOffer&InternetAdvertising=true&PageSize=8&pageNumber=1&Address=london&marketingMode=letting%2CsellingAndLetting&bedroomsFrom=1&bedroomsTo=4&sortBy=price&rentFrom=10000&rentTo=200000&propertyType=house'
    expect(getUrlQuery(params)).toEqual(expected)
  })

  it('should correctly return a URL query for sales', () => {
    process.env.WEB_COMPONENT_API_BASE_URL_SEARCH_WIDGET = 'http://localhost:3000'
    const params: GetPropertiesType = {
      apiKey: 'apiKey',
      keywords: 'london',
      pageNumber: 1,
      isRental: false,
      bedroomsFrom: 1,
      bedroomsTo: 4,
      priceFrom: 10000,
      priceTo: 200000,
      sortBy: 'price',
      propertyType: 'house',
    }
    const expected =
      'http://localhost:3000/properties?SellingStatuses=forSale%2CunderOffer&InternetAdvertising=true&PageSize=8&pageNumber=1&Address=london&marketingMode=selling%2CsellingAndLetting&bedroomsFrom=1&bedroomsTo=4&sortBy=price&priceFrom=10000&priceTo=200000&propertyType=house'
    expect(getUrlQuery(params)).toEqual(expected)
  })

  it('should correctly call the fetcher for sale properties', async () => {
    process.env.WEB_COMPONENT_API_BASE_URL_SEARCH_WIDGET = 'http://localhost:3000'
    ;(fetcher as jest.Mock).mockImplementation(() => propertiesStub)

    const params: GetPropertiesType = {
      apiKey: 'API_KEY',
      keywords: 'london',
      pageNumber: 1,
      isRental: true,
      bedroomsFrom: 1,
      bedroomsTo: 4,
      priceFrom: 10000,
      priceTo: 200000,
      sortBy: 'price',
      propertyType: 'house',
    }

    const response = await getProperties(params)
    expect(fetcher).toHaveBeenCalledWith({
      url: getUrlQuery(params),
      headers: getClientHeaders('API_KEY'),
    })
    expect(response).toEqual(propertiesStub)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})
