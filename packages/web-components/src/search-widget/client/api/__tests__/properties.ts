import { fetcher } from '../../../../common/utils/fetcher-client'
import { propertiesStub } from '../../../server/api/__stubs__/properties'
import { getProperties, getUrlQuery } from '../properties'
import { getClientHeaders } from '../../../../common/utils/get-client-headers'

jest.mock('../../../../common/utils/fetcher-client')

describe('properties client API', () => {
  it('should correctly return a URL query for a rental', () => {
    process.env.WEB_COMPONENT_API_BASE_URL_SEARCH_WIDGET = 'http://localhost:3000'
    const expected =
      'http://localhost:3000/properties?SellingStatuses=forSale%2CunderOffer&InternetAdvertising=true&PageSize=8&pageNumber=1&Address=E2&marketingMode=letting%2CsellingAndLetting'
    expect(getUrlQuery(true, 'E2')).toEqual(expected)
  })

  it('should correctly return a URL query for sales', () => {
    process.env.WEB_COMPONENT_API_BASE_URL_SEARCH_WIDGET = 'http://localhost:3000'
    const expected =
      'http://localhost:3000/properties?SellingStatuses=forSale%2CunderOffer&InternetAdvertising=true&PageSize=8&pageNumber=1&Address=E2&marketingMode=selling%2CsellingAndLetting'
    expect(getUrlQuery(false, 'E2')).toEqual(expected)
  })

  it('should correctly call the fetcher for sale properties', async () => {
    process.env.WEB_COMPONENT_API_BASE_URL_SEARCH_WIDGET = 'http://localhost:3000'
    ;(fetcher as jest.Mock).mockImplementation(() => propertiesStub)

    const response = await getProperties('e2', true, 'API_KEY')

    expect(fetcher).toHaveBeenCalledWith({
      url: getUrlQuery(true, 'e2'),
      headers: getClientHeaders('API_KEY'),
    })
    expect(response).toEqual(propertiesStub)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})
