import { CredentialsResponseModel, powerBiApiService } from '../power-bi-api'
import { mockBrowserSession } from '../__mocks__/session'
import { fetcher } from '@reapit/elements'

jest.mock('@reapit/elements')

const mockedFetch = fetcher as jest.Mock
const mockCredentialsResponse: CredentialsResponseModel = {
  token: 'SOME_TOKEN',
  information: null,
  status: 'complete',
  reports: [
    {
      name: 'SOME_NAME',
      reportId: 'SOME_ID',
      embeddedUrl: 'SOME_URL',
    },
  ],
}

describe('powerBiApiService', () => {
  it('should return a response from the config service', async () => {
    mockedFetch.mockReturnValueOnce(mockCredentialsResponse)
    expect(await powerBiApiService(mockBrowserSession)).toEqual({
      token: mockCredentialsResponse.token,
      information: mockCredentialsResponse.information,
      status: mockCredentialsResponse.status,
      report: mockCredentialsResponse.reports[0],
    })
    expect(fetcher).toHaveBeenCalledTimes(1)
  })

  it('should catch an error if no response from config service', async () => {
    const errorSpy = jest.spyOn(console, 'error')
    mockedFetch.mockReturnValueOnce(undefined as any)
    await powerBiApiService(mockBrowserSession)
    expect(errorSpy).toHaveBeenCalledWith('No response returned by API')
  })
})
