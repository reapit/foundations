import { tokenExpired, logOutUser, getAccessToken } from '../cognito'
import store from '../../core/store'
import { authLogout } from '../../actions/auth'

jest.mock('../../core/store')

describe('Cognito Utils', () => {
  describe('tokenExpired', () => {
    it('should return true if token has expired', () => {
      const expiredTwoMinsAgo = Math.round(new Date().getTime() / 1000) - 120
      expect(tokenExpired(expiredTwoMinsAgo)).toBe(true)
    })

    it('should return false if token has not expired', () => {
      const expiresInTwoMins = Math.round(new Date().getTime() / 1000) + 120
      expect(tokenExpired(expiresInTwoMins)).toBe(false)
    })
  })

  describe('logOutUser', () => {
    it('should dispatch a logout action and return null', () => {
      expect(logOutUser('CLIENT')).toBeNull()
      expect(store.dispatch).toHaveBeenCalledTimes(1)
      expect(store.dispatch).toHaveBeenCalledWith(authLogout('CLIENT'))
    })
  })

  describe('getAccessToken', () => {
    it('should return logout if no loginSession', async () => {
      ;(store.state as any) = {
        auth: {
          loginSession: null,
          loginType: 'CLIENT'
        }
      }
      await getAccessToken()
      expect(store.dispatch).toHaveBeenCalledTimes(1)
      expect(store.dispatch).toHaveBeenCalledWith(authLogout('CLIENT'))
    })

    it('should the accessToken if not expired', async () => {
      const expiresInTwoMins = Math.round(new Date().getTime() / 1000) + 120
      const accessToken = 'MOCK_ACCESS_TOKEN'
      ;(store.state as any).auth.loginSession = {
        accessToken,
        accessTokenExpiry: expiresInTwoMins
      }

      expect(await getAccessToken()).toEqual(accessToken)
    })

    it('should return the refreshed session if successful refresh', async () => {
      const refreshedAccessToken = 'MOCK_REFRESHED_ACCESS_TOKEN'
      const accessTokenExpired = 'MOCK_ACCESS_TOKEN_EXPIRED'
      const expiresTwoMinsAgo = Math.round(new Date().getTime() / 1000) - 120
      window.fetch = jest.fn().mockReturnValue({
        status: 200,
        json: () => ({
          accessToken: refreshedAccessToken
        })
      })
      ;(store.state as any).auth.loginSession = {
        accessToken: accessTokenExpired,
        accessTokenExpiry: expiresTwoMinsAgo
      }
      expect(await getAccessToken()).toEqual(refreshedAccessToken)
    })
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})
