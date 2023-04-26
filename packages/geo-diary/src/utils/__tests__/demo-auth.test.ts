import { fetcher } from '@reapit/utils-common'
import { ReapitConnectBrowserSession } from '@reapit/connect-session'
import { handleDemoAuth } from '../demo-auth'

jest.mock('@reapit/utils-common')

const mockedFetch = fetcher as jest.Mock
const mockSession = {
  refreshToken: 'SOME_TOKEN',
}

const mockConfig = {
  appId: 'SOME_APP_ID',
  connectClientId: 'SOME_CLIENT_ID',
  demoUser: 'email@example.com',
  platformApiUrl: 'https://platform.example.com',
}

process.env = mockConfig as typeof process.env

describe('handleDemoAuth', () => {
  it('should return null and not fetch credentials if no demo query is found', async () => {
    const result = await handleDemoAuth()

    expect(result).toBeNull()
    expect(mockedFetch).not.toHaveBeenCalled()
  })

  it('should return null and set fetched credentials to local storage if demo is in query string', async () => {
    ;(window as any).reapit.config = mockConfig
    window.location.search = '?demo=true'
    mockedFetch.mockReturnValueOnce(Promise.resolve(mockSession))

    const result = await handleDemoAuth()

    expect(result).toBeNull()
    expect(mockedFetch).toHaveBeenCalledWith({
      api: mockConfig.platformApiUrl,
      body: { externalAppId: mockConfig.connectClientId },
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      url: `/marketplace/apps/${mockConfig.appId}/demonstration`,
    })

    expect(
      window.sessionStorage.getItem(
        `${ReapitConnectBrowserSession.REFRESH_TOKEN_KEY}_${mockConfig.demoUser}_${mockConfig.connectClientId}`,
      ),
    ).toEqual(mockSession.refreshToken)

    expect(
      window.sessionStorage.getItem(`${ReapitConnectBrowserSession.USER_NAME_KEY}_${mockConfig.connectClientId}`),
    ).toEqual(mockConfig.demoUser)
  })
})
