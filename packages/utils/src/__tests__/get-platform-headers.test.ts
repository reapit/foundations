import { getPlatformHeaders } from '../get-platform-headers'
import { ReapitConnectBrowserSession } from '@reapit/connect-session'

const mockSession = ({
  connectSession: jest.fn(() => ({
    accessToken: 'SOME_TOKEN',
  })),
  connectLoginRedirect: jest.fn(),
} as unknown) as ReapitConnectBrowserSession

const mockApiVersion = 'latest'

describe('getPlatformHeaders', () => {
  it('should return headers correctly if has a valid session', async () => {
    const result = await getPlatformHeaders(mockSession, mockApiVersion)
    expect(result).toEqual({
      Authorization: 'Bearer SOME_TOKEN',
      'api-version': 'latest',
      'Content-Type': 'application/json',
    })
    expect(mockSession.connectSession).toHaveBeenCalledTimes(1)
    expect(mockSession.connectLoginRedirect).not.toHaveBeenCalled()
  })

  it('should redirect to login if no valid session', async () => {
    const invalidSession = ({
      ...mockSession,
      connectSession: jest.fn(() => null),
    } as unknown) as ReapitConnectBrowserSession

    const result = await getPlatformHeaders(invalidSession, mockApiVersion)
    expect(result).toEqual({})
    expect(invalidSession.connectSession).toHaveBeenCalledTimes(1)
    expect(invalidSession.connectLoginRedirect).toHaveBeenCalledTimes(1)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})
