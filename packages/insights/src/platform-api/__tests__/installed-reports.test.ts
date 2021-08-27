import { getInstalledReportsService, InstalledReportPagedModel } from '../installed-reports'
import { mockBrowserSession } from '../__mocks__/session'
import { fetcher } from '@reapit/elements-legacy'

jest.mock('@reapit/elements-legacy')

const mockedFetch = fetcher as jest.Mock
const mockCredentialsResponse: InstalledReportPagedModel = {
  pageNumber: 1,
  pageSize: 1,
  pageCount: 1,
  totalPageCount: 1,
  totalCount: 1,
  _embedded: [
    {
      created: 'SOME_VALUE',
      embeddedUrl: 'SOME_VALUE',
      id: 'SOME_VALUE',
      isExternal: 'SOME_VALUE',
      name: 'SOME_VALUE',
      token: 'SOME_VALUE',
    },
  ],
}

describe('getInstalledReportsService', () => {
  it('should return a response from the service', async () => {
    mockedFetch.mockReturnValueOnce(mockCredentialsResponse)
    expect(await getInstalledReportsService(mockBrowserSession)).toEqual(mockCredentialsResponse._embedded)
    expect(fetcher).toHaveBeenCalledTimes(1)
  })

  it('should catch an error if no response from the service', async () => {
    const errorSpy = jest.spyOn(console, 'error')
    mockedFetch.mockReturnValueOnce(undefined as any)
    await getInstalledReportsService(mockBrowserSession)
    expect(errorSpy).toHaveBeenCalledWith('No response returned by API')
  })
})
