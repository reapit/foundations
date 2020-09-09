import { getNegotiators } from '../negotiators-api'
import { PagedResultNegotiatorModel_ } from '@reapit/foundations-ts-definitions'
import { mockBrowserSession } from '../__mocks__/session'
import { fetcher } from '@reapit/elements'

jest.mock('@reapit/elements')

const mockedFetch = fetcher as jest.Mock
const mockConfigurationNegotiators = [
  {
    _embedded: [
      {
        id: 'SOME_ID',
        created: 'SOME_CREATED',
        modified: 'SOME_MODIFIED',
        name: 'SOME_NAME',
        jobTitle: 'SOME_JOB_TITLE',
        active: true,
        officeId: 'SOME_OFFICE_ID',
        workPhone: 'SOME_WORK_PHONE',
        mobilePhone: 'SOME_MOBILE_PHONE',
        _eTag: 'SOME_ETAG',
      },
    ],
    pageNumber: 1,
    pageSize: 25,
    pageCount: 25,
    totalCount: 1000,
  },
] as PagedResultNegotiatorModel_[]

describe('getNegotiators', () => {
  it('should return a response from the negotiators service', async () => {
    mockedFetch.mockReturnValueOnce(mockConfigurationNegotiators)
    expect(await getNegotiators(mockBrowserSession)).toEqual(mockConfigurationNegotiators)
    expect(fetcher).toHaveBeenCalledTimes(1)
  })

  it('should catch an error if no response from negotiators service', async () => {
    const errorSpy = jest.spyOn(console, 'error')
    mockedFetch.mockReturnValueOnce(undefined as any)
    await getNegotiators(mockBrowserSession)
    expect(errorSpy).toHaveBeenCalledWith('Error fetching Negotiators', 'No response returned by API')
  })
})
