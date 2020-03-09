import { fetcher } from '../../../../common/utils/fetcher-client'
import { propertiesStub } from '../../../server/api/__stubs__/properties'
import { getProperties } from '../properties'
import { getClientHeaders } from '../../../../common/utils/get-client-headers'

jest.mock('../../../../common/utils/fetcher-client')

describe('properties client API', () => {
  it('should correctly call the fetcher for sale properties', async () => {
    ;(fetcher as jest.Mock).mockImplementation(() => propertiesStub)

    const response = await getProperties('e2', true, 'API_KEY')

    expect(fetcher).toHaveBeenCalledWith({
      url: 'http://localhost:3000/properties',
      headers: getClientHeaders('API_KEY'),
      body: {
        isRental: true,
        keywords: 'e2',
      },
    })
    expect(response).toEqual(propertiesStub)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})
