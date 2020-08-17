import { FetchMock } from 'jest-fetch-mock'
import { ReapitConnectServerSession } from '../index'
import { mockTokenResponse, mockServerInitializers } from '../../__mocks__/session'

jest.mock('jsonwebtoken', () => ({
  decode: (token: string) => {
    return JSON.parse(token)
  },
}))

jest.mock('../../utils/verify-decode-id-token')

const mockedFetch = fetch as FetchMock

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
    mockedFetch.mockResponseOnce(JSON.stringify(mockTokenResponse))

    const session = getSession()

    const connectSession = await session.connectAccessToken()

    expect(window.fetch).toHaveBeenCalledTimes(1)
    expect(connectSession).toEqual(mockTokenResponse.access_token)

    const cachedConnectSession = await session.connectAccessToken()

    expect(window.fetch).toHaveBeenCalledTimes(1)
    expect(cachedConnectSession).toEqual(mockTokenResponse.access_token)
  })

  it('should make a second call and fetch a new session from endpoint if a cached session has expired', async () => {
    const expiringAccessToken = JSON.stringify({
      exp: Math.round(new Date().getTime() / 1000), // time now, token is expiring
    })
    mockedFetch.mockResponseOnce(
      JSON.stringify({
        ...mockTokenResponse,
        access_token: expiringAccessToken,
      }),
    )

    const session = getSession()

    const connectSession = await session.connectAccessToken()

    expect(window.fetch).toHaveBeenCalledTimes(1)
    expect(connectSession).toEqual(expiringAccessToken)

    mockedFetch.mockResponseOnce(JSON.stringify(mockTokenResponse))

    const cachedConnectSession = await session.connectAccessToken()

    expect(window.fetch).toHaveBeenCalledTimes(2)
    expect(cachedConnectSession).toEqual(mockTokenResponse.access_token)
  })

  it('should throw if Reapit Connect returns an error', async () => {
    const errorSpy = jest.spyOn(console, 'error')
    const errorMessage = 'I am an error'
    mockedFetch.mockResponseOnce(
      JSON.stringify({
        error: errorMessage,
      }),
    )

    const session = getSession()

    const connectSession = await session.connectAccessToken()

    expect(window.fetch).toHaveBeenCalledTimes(1)
    expect(errorSpy).toHaveBeenCalledTimes(2)
    expect(errorSpy).toHaveBeenCalledWith('Reapit Connect Token Error', errorMessage)

    expect(connectSession).toBeUndefined()

    mockedFetch.mockResponseOnce(JSON.stringify(mockTokenResponse))

    const cachedConnectSession = await session.connectAccessToken()

    expect(window.fetch).toHaveBeenCalledTimes(2)
    expect(cachedConnectSession).toEqual(mockTokenResponse.access_token)
  })

  it('should throw if Reapit Connect does not return a session', async () => {
    const errorSpy = jest.spyOn(console, 'error')

    mockedFetch.mockResponseOnce(JSON.stringify({}))

    const session = getSession()

    const connectSession = await session.connectAccessToken()

    expect(window.fetch).toHaveBeenCalledTimes(1)
    expect(errorSpy).toHaveBeenCalledTimes(2)
    expect(errorSpy).toHaveBeenCalledWith('Reapit Connect Token Error', 'No access token returned by Reapit Connect')

    expect(connectSession).toBeUndefined()

    mockedFetch.mockResponseOnce(JSON.stringify(mockTokenResponse))

    const cachedConnectSession = await session.connectAccessToken()

    expect(window.fetch).toHaveBeenCalledTimes(2)
    expect(cachedConnectSession).toEqual(mockTokenResponse.access_token)
  })

  afterEach(() => {
    jest.resetAllMocks()
    window.localStorage.clear()
  })
})
