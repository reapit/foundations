import {
  tokenExpired,
  logOutUser,
  getLoginSession,
  getRefreshedSession,
  getAccessToken,
  getNewUser,
  cognitoLogin,
  cognitoRefreshSession
} from '../cognito'
import store from '../../core/store'
import { authLogout } from '../../actions/auth'
import { mockCognitoUserSession, mockLoginSession } from '../__mocks__/cognito'
import { CognitoUserSession, AuthenticationDetails } from 'amazon-cognito-identity-js'
import { LoginSession } from '../../reducers/auth'

// TODO - need to map this mock as a module - was hard work to get here - stupid mocking
jest.mock('amazon-cognito-identity-js', () => ({
  CognitoUserPool: jest.fn(),
  AuthenticationDetails: jest.fn(),
  CognitoUser: () => ({
    refreshSession: (_token: string, callback = (_err: Error | undefined, session: CognitoUserSession) => session) => {
      return callback(undefined, mockCognitoUserSession)
    },
    authenticateUser: (
      _authenticationDetails: AuthenticationDetails,
      callback = {
        onSuccess: (session: CognitoUserSession) => session,
        onError: (err: Error) => err
      }
    ) => {
      callback.onSuccess(mockCognitoUserSession)
    }
  })
}))

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

  describe('getLoginSession', () => {
    it('should correctly return a LoginSession', () => {
      const expected = {
        accessToken: 'MOCK_ACCESS_TOKEN',
        refreshToken: 'MOCK_REFRESH_TOKEN',
        sessionExpiry: 1,
        userName: 'bob@acme.com',
        loginType: 'CLIENT'
      }
      expect(getLoginSession(mockCognitoUserSession, 'bob@acme.com', 'CLIENT')).toEqual(expected)
    })
  })

  describe('getRefreshedSession', () => {
    it('should fetch a new session dispatch auth success and return the session', async () => {
      const refreshedSession = await getRefreshedSession(mockLoginSession)

      expect(refreshedSession).toEqual(getLoginSession(mockCognitoUserSession, 'bob@acme.com', 'CLIENT'))
    })
  })

  describe('getAccessToken', () => {
    it('should return logout if no loginSession', async () => {
      ;(store.state as any) = {
        auth: {
          loginType: 'CLIENT',
          loginSession: null
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
        sessionExpiry: expiresInTwoMins
      }

      expect(await getAccessToken()).toEqual(accessToken)
    })

    it('should return the refreshed session if successful refresh', async () => {
      const expiresTwoMinsAgo = Math.round(new Date().getTime() / 1000) - 120
      const accessToken = 'MOCK_ACCESS_TOKEN_EXPIRED'
      ;(store.state as any).auth.loginSession = {
        accessToken,
        sessionExpiry: expiresTwoMinsAgo
      }
      expect(await getAccessToken()).toEqual('MOCK_ACCESS_TOKEN')
    })
  })

  describe('getNewUser', () => {
    it('should correctly return a CognitoUser instance', () => {
      const cognitoUser = getNewUser('bob@acme.com')
      expect(typeof cognitoUser.refreshSession).toEqual('function')
      expect(typeof cognitoUser.authenticateUser).toEqual('function')
    })
  })

  describe('cognitoLogin', () => {
    it('should return a CognitoUserSession', async () => {
      expect(await cognitoLogin({ userName: 'bob@acme.com', password: 'xxxx', loginType: 'CLIENT' })).toEqual(
        getLoginSession(mockCognitoUserSession, 'bob@acme.com', 'CLIENT')
      )
    })
  })

  describe('cognitoRefreshSession', () => {
    it('should return a CognitoUserSession', async () => {
      expect(
        await cognitoRefreshSession({
          userName: 'bob@acme.com',
          accessToken: 'MOCK_REFRESH_TOKEN',
          loginType: 'CLIENT'
        } as LoginSession)
      ).toEqual(getLoginSession(mockCognitoUserSession, 'bob@acme.com', 'CLIENT'))
    })
  })
  afterEach(() => {
    jest.resetAllMocks()
  })
})
