import { getProperties } from '../properties-api'
import { PagedResultPropertyModel_ } from '@reapit/foundations-ts-definitions'
import { mockBrowserSession } from '../__mocks__/session'
import { fetcher } from '@reapit/elements'

jest.mock('@reapit/elements')

const mockedFetch = fetcher as jest.Mock
const mockConfigurationProperties = [
  {
    _embedded: [
      {
        id: 'SOME_ID',
        created: 'SOME_CREATED',
        modified: 'SOME_MODIFIED',
        marketingMode: 'SOME_MARKETING_MODE',
        currency: 'SOME_CURRENCY',
        address: {
          line1: 'SOME_ADDRESS_1',
          line2: 'SOME_ADDRESS_2',
          line3: 'SOME_ADDRESS_3',
          line4: 'SOME_ADDRESS_4',
          postcode: 'SOME_POSTCODE',
        },
        areaId: 'SOME_AREA_ID',
        strapline: 'SOME_STRAPLINE',
        summary: 'SOME_SUMMARY',
        _eTag: 'SOME_ETAG',
      },
    ],
    pageNumber: 1,
    pageSize: 25,
    pageCount: 25,
    totalCount: 1000,
  },
] as PagedResultPropertyModel_[]

describe('getProperties', () => {
  it('should return a response from the properties service', async () => {
    mockedFetch.mockReturnValueOnce(mockConfigurationProperties)
    expect(await getProperties(mockBrowserSession)).toEqual(mockConfigurationProperties)
    expect(fetcher).toHaveBeenCalledTimes(1)
  })

  it('should catch an error if no response from properties service', async () => {
    const errorSpy = jest.spyOn(console, 'error')
    mockedFetch.mockReturnValueOnce(undefined as any)
    await getProperties(mockBrowserSession)
    expect(errorSpy).toHaveBeenCalledWith('Error fetching Properties', 'No response returned by API')
  })
})
