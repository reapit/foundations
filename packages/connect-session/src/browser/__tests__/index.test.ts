import { FetchMock } from 'jest-fetch-mock'
import { ReapitConnectBrowserSession } from '../index'
import { mockTokenResponse, mockSessionFromLocalStorage } from '../../__mocks__/session'
import {
  mockBrowserInitializers,
  setMockBrowserSessionToLocalStorage,
  mockBrowserSession,
} from '../../__mocks__/session'

jest.mock('jsonwebtoken', () => ({
  decode: (token: string) => {
    return JSON.parse(token)
  },
}))

const mockedFetch = fetch as FetchMock

const getSession = () =>
  new ReapitConnectBrowserSession({
    ...mockBrowserInitializers,
  })

describe('ReapitConnectBrowserSession', () => {
  it('should correctly insantiate the class', () => {
    const session = getSession()
    expect(session instanceof ReapitConnectBrowserSession).toBe(true)
    expect(session.connectAuthorizeRedirect).toBeDefined()
    expect(session.connectLoginRedirect).toBeDefined()
    expect(session.connectLogoutRedirect).toBeDefined()
    expect(session.connectIsDesktop).toBeDefined()
  })

  it('should retrieve a session from localStorage and return as a session', async () => {
    setMockBrowserSessionToLocalStorage()
    const session = getSession()

    const connectSession = await session.connectSession()

    expect(connectSession).toEqual(mockBrowserSession)
  })

  it('should refresh a session from a refresh token if session has expired', async () => {
    mockedFetch.mockResponseOnce(JSON.stringify(mockTokenResponse))
    const expiredSession = {
      ...mockBrowserSession,
      accessToken: JSON.stringify({ exp: Math.round(new Date().getTime() / 1000) }),
    }
    setMockBrowserSessionToLocalStorage(expiredSession)
    const session = getSession()

    const connectSession = await session.connectSession()

    expect(window.fetch).toHaveBeenCalledTimes(1)
    expect(connectSession).toEqual(mockBrowserSession)
  })

  it('should refresh a session from a code if session has expired and code is in url', async () => {
    const code = 'SOME_CODE'
    window.location.search = `?code=${code}`

    mockedFetch.mockResponseOnce(JSON.stringify(mockTokenResponse))

    const expiredSession = {
      ...mockBrowserSession,
      accessToken: JSON.stringify({ exp: Math.round(new Date().getTime() / 1000) }),
      refreshToken: '',
    }

    setMockBrowserSessionToLocalStorage(expiredSession)
    const session = getSession()

    const connectSession = await session.connectSession()

    expect(window.fetch).toHaveBeenCalledTimes(1)
    expect(connectSession).toEqual(mockBrowserSession)
  })

  it('should only call once to api and return undefined if already fetching', async () => {
    const code = 'SOME_CODE'
    window.location.search = `?code=${code}`

    mockedFetch.mockResponseOnce(JSON.stringify(mockTokenResponse))

    const expiredSession = {
      ...mockBrowserSession,
      accessToken: JSON.stringify({ exp: Math.round(new Date().getTime() / 1000) }),
      refreshToken: '',
    }

    setMockBrowserSessionToLocalStorage(expiredSession)
    const session = getSession()
    session.connectSession()
    const connectSession = await session.connectSession()

    expect(window.fetch).toHaveBeenCalledTimes(1)
    expect(connectSession).toBeUndefined()
  })

  it('should redirect to the authorize endpoint if no refresh token or code', async () => {
    window.location.search = ''
    const mockedAuthEndpoint = jest.spyOn(ReapitConnectBrowserSession.prototype, 'connectAuthorizeRedirect')

    const expiredSession = {
      ...mockBrowserSession,
      accessToken: JSON.stringify({ exp: Math.round(new Date().getTime() / 1000) }),
      refreshToken: '',
    }

    setMockBrowserSessionToLocalStorage(expiredSession)
    const session = getSession()

    await session.connectSession()

    expect(mockedAuthEndpoint).toHaveBeenCalledTimes(1)
  })

  it('should refresh authorize endpoint if token endpoint fails', async () => {
    const mockedAuthEndpoint = jest.spyOn(ReapitConnectBrowserSession.prototype, 'connectAuthorizeRedirect')
    const code = 'SOME_CODE'
    window.location.search = `?code=${code}`

    mockedFetch.mockResponseOnce(JSON.stringify({ error: 'Error from API' }))

    const expiredSession = {
      ...mockBrowserSession,
      accessToken: JSON.stringify({ exp: Math.round(new Date().getTime() / 1000) }),
      refreshToken: '',
    }

    setMockBrowserSessionToLocalStorage(expiredSession)
    const session = getSession()

    await session.connectSession()

    expect(window.fetch).toHaveBeenCalledTimes(1)
    expect(mockedAuthEndpoint).toHaveBeenCalledTimes(1)
  })

  it('should redirect to login if the method is called on session', async () => {
    const mockedLoginEndpoint = jest.spyOn(ReapitConnectBrowserSession.prototype, 'connectLoginRedirect')

    setMockBrowserSessionToLocalStorage()
    const session = getSession()

    session.connectLoginRedirect()

    expect(mockedLoginEndpoint).toHaveBeenCalledTimes(1)
  })

  it('should redirect to logout if the method is called on session', async () => {
    const mockedLoginEndpoint = jest.spyOn(ReapitConnectBrowserSession.prototype, 'connectLogoutRedirect')

    setMockBrowserSessionToLocalStorage()
    const initialSession = mockSessionFromLocalStorage()

    expect(initialSession.loginUser).toEqual(mockBrowserSession.loginIdentity.email)
    expect(initialSession.accessToken).toEqual(mockBrowserSession.accessToken)
    expect(initialSession.idToken).toEqual(mockBrowserSession.idToken)
    expect(initialSession.refreshToken).toEqual(mockBrowserSession.refreshToken)

    const session = getSession()

    session.connectLogoutRedirect()

    const cachedSession = mockSessionFromLocalStorage()

    expect(cachedSession.loginUser).toBeUndefined()
    expect(cachedSession.accessToken).toBeUndefined()
    expect(cachedSession.idToken).toBeUndefined()
    expect(cachedSession.refreshToken).toBeUndefined()
    expect(mockedLoginEndpoint).toHaveBeenCalledTimes(1)
  })

  afterEach(() => {
    jest.resetAllMocks()
    window.localStorage.clear()
  })
})
