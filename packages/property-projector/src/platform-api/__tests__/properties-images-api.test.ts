import { getPropertyImages, getAllPropertyImages } from '../property-images-api'
import { PagedResultPropertyImageModel_ } from '@reapit/foundations-ts-definitions'
import { mockBrowserSession } from '../__mocks__/session'
import { fetcher } from '@reapit/elements'

jest.mock('@reapit/elements')

const mockedFetch = fetcher as jest.Mock
const mockConfigurationPropertyImages = [
  {
    _embedded: [
      {
        id: 'SOME_ID',
        created: 'SOME_CREATED',
        modified: 'SOME_MODIFIED',
        propertyId: 'SOME_PROPERTY_ID',
        url: 'SOME_URL',
        caption: 'SOME_CAPTION',
        type: 'SOME_TYPE',
        order: 1,
        _eTag: 'SOME_ETAG',
      },
    ],
    pageNumber: 1,
    pageSize: 25,
    pageCount: 25,
    totalCount: 1000,
  },
] as PagedResultPropertyImageModel_[]

describe('getPropertyImages', () => {
  it('should return a response from the property images service', async () => {
    mockedFetch.mockReturnValueOnce(mockConfigurationPropertyImages)
    expect(await getPropertyImages(mockBrowserSession)).toEqual(mockConfigurationPropertyImages)
    expect(fetcher).toHaveBeenCalledTimes(1)
  })

  it('should catch an error if no response from property images service', async () => {
    const errorSpy = jest.spyOn(console, 'error')
    mockedFetch.mockReturnValueOnce(undefined as any)
    await getPropertyImages(mockBrowserSession)
    expect(errorSpy).toHaveBeenCalledWith('Error fetching Property Images', 'No response returned by API')
  })
})
