import { FetchMock } from 'jest-fetch-mock'
import { ReapitConnectBrowserSession } from '../index'
import { mockTokenResponse, mockBrowserSession } from '../../__mocks__/session'
import { mockBrowserInitializers } from '../../__mocks__/session'

jest.mock('jsonwebtoken', () => ({
  decode: (token: string) => {
    return JSON.parse(token)
  },
}))

jest.mock('../../utils/verify-decode-id-token')

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
    expect(session.connectHasSession).toBeDefined()
  })

  it('should retrieve a session from memory and return as a session', async () => {
    const session = getSession()
    const validSession = Object.assign(session, { session: mockBrowserSession }) as ReapitConnectBrowserSession
    const connectSession = await validSession.connectSession()

    expect(connectSession).toEqual(mockBrowserSession)
  })

  it('should return true from connectHasSession if session valid', () => {
    const session = getSession()
    const validSession = Object.assign(session, { session: mockBrowserSession }) as ReapitConnectBrowserSession

    expect(validSession.connectHasSession).toBe(true)
  })

  it('should return false from connectHasSession if session has expired', () => {
    const expiredSession = {
      ...mockBrowserSession,
      accessToken: JSON.stringify({ exp: Math.round(new Date().getTime() / 1000) }),
    }

    const session = getSession()
    const invalidSession = Object.assign(session, { session: expiredSession }) as ReapitConnectBrowserSession

    expect(invalidSession.connectHasSession).toBe(false)
  })

  it('should return false from connectIsDesktop if desktop global is not present', () => {
    const session = getSession()

    expect(session.connectIsDesktop).toBe(false)
  })

  it('should return true from connectIsDesktop if desktop global is present', () => {
    Object.defineProperty(window, ReapitConnectBrowserSession.GLOBAL_KEY, {
      value: {},
    })
    const session = getSession()

    expect(session.connectIsDesktop).toBe(true)
  })

  it('should refresh a session from a refresh token if session has expired', async () => {
    mockedFetch.mockResponseOnce(JSON.stringify(mockTokenResponse))
    const expiredSession = {
      ...mockBrowserSession,
      accessToken: JSON.stringify({ exp: Math.round(new Date().getTime() / 1000) }),
    }

    const session = getSession()
    const invalidSession = Object.assign(session, { session: expiredSession }) as ReapitConnectBrowserSession

    const connectSession = await invalidSession.connectSession()

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

    const session = getSession()
    const invalidSession = Object.assign(session, { session: expiredSession }) as ReapitConnectBrowserSession

    const connectSession = await invalidSession.connectSession()

    expect(window.fetch).toHaveBeenCalledTimes(1)
    expect(connectSession).toEqual(mockBrowserSession)
  })

  it('should only call once to api and return undefined if already fetching', async () => {
    const code = 'SOME_CODE'
    window.location.search = `?code=${code}`

    mockedFetch.mockResponseOnce(JSON.stringify(mockTokenResponse))

    const session = getSession()
    session.connectSession()

    const connectSession = await session.connectSession()

    expect(window.fetch).toHaveBeenCalledTimes(1)
    expect(connectSession).toBeUndefined()
  })

  it('should redirect to the authorize endpoint if no refresh token or code', async () => {
    window.location.search = ''
    const mockedAuthEndpoint = jest.spyOn(ReapitConnectBrowserSession.prototype, 'connectAuthorizeRedirect')

    const session = getSession()

    await session.connectSession()

    expect(mockedAuthEndpoint).toHaveBeenCalledTimes(1)
  })

  it('should refresh authorize endpoint if token endpoint fails', async () => {
    const mockedAuthEndpoint = jest.spyOn(ReapitConnectBrowserSession.prototype, 'connectAuthorizeRedirect')
    const code = 'SOME_CODE'
    window.location.search = `?code=${code}`

    mockedFetch.mockResponseOnce(JSON.stringify({ error: 'Error from API' }))

    const session = getSession()

    await session.connectSession()

    expect(window.fetch).toHaveBeenCalledTimes(1)
    expect(mockedAuthEndpoint).toHaveBeenCalledTimes(1)
  })

  it('should redirect to login if the method is called on session', async () => {
    const mockedLoginEndpoint = jest.spyOn(ReapitConnectBrowserSession.prototype, 'connectLoginRedirect')

    const session = getSession()

    session.connectLoginRedirect()

    expect(mockedLoginEndpoint).toHaveBeenCalledTimes(1)
  })

  it('should redirect to logout if the method is called on session', async () => {
    const mockedLoginEndpoint = jest.spyOn(ReapitConnectBrowserSession.prototype, 'connectLogoutRedirect')
    const session = getSession()

    session.connectLogoutRedirect()

    expect(mockedLoginEndpoint).toHaveBeenCalledTimes(1)
  })

  afterEach(() => {
    jest.resetAllMocks()
    window.localStorage.clear()
  })
})
