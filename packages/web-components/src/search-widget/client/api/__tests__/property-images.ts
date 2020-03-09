import { fetcher } from '../../../../common/utils/fetcher-client'
import { propertiesStub } from '../../../server/api/__stubs__/properties'
import { getPropertyImages } from '../property-images'
import { getClientHeaders } from '../../../../common/utils/get-client-headers'
import { PropertyModel } from '@reapit/foundations-ts-definitions'
import { propertyImagesStub } from '../../../server/api/__stubs__/property-images'
import { PropertyImageModel } from '../../../../../../aml-checklist/src/types/api-2020-01-31/platform-schema'

jest.mock('../../../../common/utils/fetcher-client')

describe('properties client API', () => {
  it('should correctly call the fetcher for sale properties', async () => {
    ;(fetcher as jest.Mock).mockImplementation(() => propertyImagesStub)
    const properties = propertiesStub._embedded as PropertyModel[]

    const response = await getPropertyImages(properties, 'API_KEY')
    const propertyImage = propertyImagesStub._embedded as PropertyImageModel[]

    expect(fetcher).toHaveBeenCalledWith({
      url: 'http://localhost:3000/propertyimages',
      headers: getClientHeaders('API_KEY'),
      body: {
        propertyIds: [properties[0].id],
      },
    })
    expect(response).toEqual({
      [propertyImage[0].propertyId as string]: propertyImage[0],
    })
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})
