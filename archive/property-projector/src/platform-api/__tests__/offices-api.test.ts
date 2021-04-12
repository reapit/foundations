import { getOffices } from '../offices-api'
import { PagedResultOfficeModel_ } from '@reapit/foundations-ts-definitions'
import { mockBrowserSession } from '../__mocks__/session'
import { fetcher } from '@reapit/elements'

jest.mock('@reapit/elements')

const mockedFetch = fetcher as jest.Mock
const mockConfigurationOffices = [
  {
    _embedded: [
      {
        id: 'SOME_ID',
        created: 'SOME_CREATED',
        modified: 'SOME_MODIFIED',
        name: 'SOME_NAME',
        manager: 'SOME_MANAGER',
        address: {
          line1: 'SOME_ADDRESS_1',
          line2: 'SOME_ADDRESS_2',
          line3: 'SOME_ADDRESS_3',
          line4: 'SOME_ADDRESS_4',
          postcode: 'SOME_POSTCODE',
        },
        workPhone: 'SOME_WORK_PHONE',
        email: 'SOME_EMAIL',
        _eTag: 'SOME_ETAG',
      },
    ],
    pageNumber: 1,
    pageSize: 25,
    pageCount: 25,
    totalCount: 1000,
  },
] as PagedResultOfficeModel_[]

describe('getOffices', () => {
  it('should return a response from the offices service', async () => {
    mockedFetch.mockReturnValueOnce(mockConfigurationOffices)
    expect(await getOffices(mockBrowserSession)).toEqual(mockConfigurationOffices)
    expect(fetcher).toHaveBeenCalledTimes(1)
  })

  it('should catch an error if no response from offices service', async () => {
    const errorSpy = jest.spyOn(console, 'error')
    mockedFetch.mockReturnValueOnce(undefined as any)
    await getOffices(mockBrowserSession)
    expect(errorSpy).toHaveBeenCalledWith('Error fetching Offices', 'No response returned by API')
  })
})
