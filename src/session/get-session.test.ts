import { getSession } from './get-session'
import { LoginSession, RefreshParams } from '../core/types'
import { mockLoginSession } from '../__mocks__/cognito-session'

jest.mock('./refresh-user-session')

describe('getSession', () => {
  it('should return null if no session or refresh session', async () => {
    expect(await getSession(null, null)).toBeNull()
  })

  it('should the accessToken if not expired', async () => {
    const expiresInTwoMins = Math.round(new Date().getTime() / 1000) + 120
    const accessToken = 'MOCK_ACCESS_TOKEN'
    const loginSession = {
      accessToken,
      accessTokenExpiry: expiresInTwoMins
    } as LoginSession

    expect(await getSession(loginSession, null)).toEqual(loginSession)
  })

  it('should refresh the session if no login session but has a refresh session', async () => {
    const refreshToken = 'MOCK_REFRESH_TOKEN'

    const refreshSession = {
      refreshToken
    } as RefreshParams

    expect(await getSession(null, refreshSession)).toEqual(mockLoginSession)
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })
})
