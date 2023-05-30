import { ReapitConnectServerSession } from '../index'
import { mockTokenResponse, mockServerInitializers, createMockToken } from '../../__mocks__/session'
import axios from 'axios'

jest.mock('idtoken-verifier', () => ({
  decode: (token: string) => {
    return JSON.parse(token)
  },
}))

jest.mock('../../utils/verify-decode-id-token')

jest.mock('axios', () => ({
  post: jest.fn(),
}))

const getSession = () =>
  new ReapitConnectServerSession({
    ...mockServerInitializers,
  })

describe('ReapitConnectServerSession', () => {
  it('should correctly insantiate the class', () => {
    const session = getSession()
    expect(session instanceof ReapitConnectServerSession).toBe(true)
    expect(session.connectAccessToken).toBeDefined()
  })

  it('should fetch a new session from endpoint then return the same session without calling endpoint', async () => {
    ;(axios.post as jest.Mock).mockReturnValueOnce({ data: mockTokenResponse })

    const session = getSession()

    const connectSession = await session.connectAccessToken()

    expect(axios.post).toHaveBeenCalledTimes(1)
    expect(connectSession).toEqual(mockTokenResponse.access_token)

    const cachedConnectSession = await session.connectAccessToken()

    expect(axios.post).toHaveBeenCalledTimes(1)
    expect(cachedConnectSession).toEqual(mockTokenResponse.access_token)
  })

  it('should make a second call and fetch a new session from endpoint if a cached session has expired', async () => {
    const expiringAccessToken = createMockToken({
      exp: Math.round(new Date().getTime() / 1000), // time now, token is expiring
    })
    ;(axios.post as jest.Mock).mockReturnValueOnce({
      data: {
        ...mockTokenResponse,
        access_token: expiringAccessToken,
      },
    })

    const session = getSession()

    const connectSession = await session.connectAccessToken()

    expect(axios.post).toHaveBeenCalledTimes(1)
    expect(connectSession).toEqual(expiringAccessToken)
    ;(axios.post as jest.Mock).mockReturnValueOnce({ data: mockTokenResponse })

    const cachedConnectSession = await session.connectAccessToken()

    expect(axios.post).toHaveBeenCalledTimes(2)
    expect(cachedConnectSession).toEqual(mockTokenResponse.access_token)
  })

  it('should throw if Reapit Connect returns an error', async () => {
    const errorSpy = jest.spyOn(console, 'error')
    const errorMessage = 'I am an error'
    ;(axios.post as jest.Mock).mockReturnValueOnce({
      data: {
        error: errorMessage,
      },
    })

    const session = getSession()

    const connectSession = await session.connectAccessToken()

    expect(axios.post).toHaveBeenCalledTimes(1)
    expect(errorSpy).toHaveBeenCalledTimes(2)
    expect(errorSpy).toHaveBeenCalledWith('Reapit Connect Token Error', errorMessage)

    expect(connectSession).toBeUndefined()
    ;(axios.post as jest.Mock).mockReturnValueOnce({ data: mockTokenResponse })

    const cachedConnectSession = await session.connectAccessToken()

    expect(axios.post).toHaveBeenCalledTimes(2)
    expect(cachedConnectSession).toEqual(mockTokenResponse.access_token)
  })

  it('should throw if Reapit Connect does not return a session', async () => {
    const errorSpy = jest.spyOn(console, 'error')
    ;(axios.post as jest.Mock).mockReturnValueOnce({ data: {} })

    const session = getSession()

    const connectSession = await session.connectAccessToken()

    expect(axios.post).toHaveBeenCalledTimes(1)
    expect(errorSpy).toHaveBeenCalledTimes(2)
    expect(errorSpy).toHaveBeenCalledWith('Reapit Connect Token Error', 'No access token returned by Reapit Connect')

    expect(connectSession).toBeUndefined()
    ;(axios.post as jest.Mock).mockReturnValueOnce({ data: mockTokenResponse })

    const cachedConnectSession = await session.connectAccessToken()

    expect(axios.post).toHaveBeenCalledTimes(2)
    expect(cachedConnectSession).toEqual(mockTokenResponse.access_token)
  })

  afterEach(() => {
    jest.resetAllMocks()
    window.localStorage.clear()
  })
})
