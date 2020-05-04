import { fetcher } from '../../../../common/utils/fetcher-client'
import { propertyStub } from '../../../server/api/__stubs__/property'
import { getProperty, GetPropertyType } from '../property'
import { getClientHeaders } from '../../../../common/utils/get-client-headers'

jest.mock('../../../../common/utils/fetcher-client')

describe('property client API', () => {
  it('should correctly call the fetcher', async () => {
    process.env.WEB_COMPONENT_API_BASE_URL_SEARCH_WIDGET = 'http://localhost:3000'
    ;(fetcher as jest.Mock).mockImplementation(() => propertyStub)

    const params: GetPropertyType = {
      apiKey: 'API_KEY',
      propertyId: 'RPT200112',
    }

    const response = await getProperty(params)
    expect(fetcher).toHaveBeenCalledWith({
      url: `${process.env.WEB_COMPONENT_API_BASE_URL_SEARCH_WIDGET}/properties/RPT200112`,
      headers: getClientHeaders('API_KEY'),
    })
    expect(response).toEqual(propertyStub)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})
