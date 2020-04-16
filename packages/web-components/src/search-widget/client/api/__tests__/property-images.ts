import { fetcher } from '../../../../common/utils/fetcher-client'
import { propertiesMinimalStub } from '../../../server/api/__stubs__/properties'
import { getPropertyImages, getPropertyQuery } from '../property-images'
import { getClientHeaders } from '../../../../common/utils/get-client-headers'
import { PickedPropertyModel } from '../../../types'
import { propertyImagesStub } from '../../../server/api/__stubs__/property-images'
import { PickedPropertyImageModel } from '../../../types'

jest.mock('../../../../common/utils/fetcher-client')

describe('properties client API', () => {
  it('should return a query string from a list of properties', () => {
    const properties = propertiesMinimalStub._embedded as PickedPropertyModel[]
    expect(getPropertyQuery(properties)).toEqual('?propertyId=RPT200112&propertyId=RPT200111')
  })

  it('should correctly call the fetcher for sale properties', async () => {
    process.env.WEB_COMPONENT_API_BASE_URL_SEARCH_WIDGET = 'http://localhost:3000'
    ;(fetcher as jest.Mock).mockImplementation(() => propertyImagesStub)
    const properties = propertiesMinimalStub._embedded as PickedPropertyModel[]

    const response = await getPropertyImages(properties, 'API_KEY')
    const propertyImagesByPropertyId = propertyImagesStub._embedded as PickedPropertyImageModel[]

    expect(fetcher).toHaveBeenCalledWith({
      url: `http://localhost:3000/propertyImages/${getPropertyQuery(properties)}`,
      headers: getClientHeaders('API_KEY'),
    })
    expect(response).toEqual({
      [propertyImagesByPropertyId[0].propertyId as string]: [propertyImagesByPropertyId[0]],
      [propertyImagesByPropertyId[1].propertyId as string]: [propertyImagesByPropertyId[1]],
    })
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})
