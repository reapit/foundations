import {
  getLoginSession,
  getNewUser,
  setSessionCookie,
  COOKIE_SESSION_KEY,
  getSessionCookie,
  getTokenFromQueryString,
  deserializeIdToken,
  tokenExpired,
  checkHasIdentityId,
  COOKIE_EXPIRY,
  redirectToOAuth,
  redirectToLogin,
} from './cognito'
import { mockCognitoUserSession, mockLoginSession } from '../__mocks__/cognito-session'
import hardtack from 'hardtack'
import { LoginIdentity } from '../core/types'
import { redirectToLogout } from './cognito'
import { getMarketplaceGlobalsByKey } from '@reapit/elements'

jest.mock('amazon-cognito-identity-js', () => require('../__mocks__/cognito-session').mockCognito)

jest.mock('jsonwebtoken', () => ({
  __esModule: true,
  default: {
    decode: () => ({
      'custom:reapit:developerId': 'SOME_DEV_ID',
      'custom:reapit:clientCode': 'SOME_CLIENT_ID',
      'custom:reapit:marketAdmin': 'SOME_ADMIN_ID',
      'custom:reapit:userCode': 'SOME_USER_CODE',
      name: 'SOME_NAME',
      email: 'SOME_EMAIL',
    }),
  },
}))

jest.mock('@reapit/elements', () => ({
  getMarketplaceGlobalsByKey: jest.fn(() => ({ key: 'value' })),
}))

describe('Session utils', () => {
  describe('getLoginSession', () => {
    it('should correctly return a LoginSession', () => {
      const expected = {
        accessToken: 'MOCK_ACCESS_TOKEN',
        accessTokenExpiry: 1,
        idToken: 'MOCK_ID_TOKEN',
        idTokenExpiry: 1,
        refreshToken: 'MOCK_REFRESH_TOKEN',
      }
      expect(getLoginSession(mockCognitoUserSession)).toEqual(expected)
    })
  })

  describe('getNewUser', () => {
    it('should correctly return a CognitoUser instance', () => {
      const cognitoUser = getNewUser('bob@acme.com', 'SOME_ID')
      expect(typeof cognitoUser.refreshSession).toEqual('function')
      expect(typeof cognitoUser.authenticateUser).toEqual('function')
    })
  })

  describe('setSessionCookie', () => {
    it('should set a refresh cookie', () => {
      window.location.hostname = 'some.host'
      hardtack.set = jest.fn()

      setSessionCookie(mockLoginSession)

      expect(hardtack.set).toHaveBeenCalledWith(
        COOKIE_SESSION_KEY,
        JSON.stringify({
          refreshToken: mockLoginSession.refreshToken,
          loginType: mockLoginSession.loginType,
          userName: mockLoginSession.userName,
          mode: 'WEB',
          cognitoClientId: 'SOME_CLIENT_ID',
        }),
        {
          path: '/',
          domain: 'some.host',
          expires: COOKIE_EXPIRY,
          samesite: 'lax',
        },
      )
    })
  })

  describe('getSessionCookie', () => {
    it('should get a session from the cookie if it exists', () => {
      const stringifiedSession = JSON.stringify({
        refreshToken: mockLoginSession.refreshToken,
        loginType: mockLoginSession.loginType,
        userName: mockLoginSession.userName,
      })

      document.cookie = `${COOKIE_SESSION_KEY}=${stringifiedSession}`

      expect(getSessionCookie()).toEqual(JSON.parse(stringifiedSession))
    })

    it('should return null if no cookie', () => {
      document.cookie = `${COOKIE_SESSION_KEY}=`

      expect(getSessionCookie()).toBeNull()
    })
  })

  describe('getTokenFromQueryString', () => {
    it('should correctly return RefreshParams for desktop mode', () => {
      ;(getMarketplaceGlobalsByKey as jest.Mock).mockImplementation(() => ({ key: 'value' }))
      const validQuery = '?code=TOKEN&state=DEVELOPER,DESKTOP'
      ;(window.location as any).origin = 'some.origin'
      const cognitoClientId = 'cognitoClientId'

      expect(getTokenFromQueryString(validQuery, cognitoClientId)).toEqual({
        loginType: 'CLIENT',
        mode: 'DESKTOP',
        cognitoClientId,
        authorizationCode: 'TOKEN',
        redirectUri: 'some.origin',
        state: 'DEVELOPER,DESKTOP',
        refreshToken: null,
        userName: null,
      })
    })

    it('should correctly return null for an invalid string', () => {
      const invalidQuery = '?somerandomquery=wmcvay@reapit.com&somerandomtoken=TOKEN'
      const cognitoClientId = 'cognitoClientId'
      expect(getTokenFromQueryString(invalidQuery, cognitoClientId)).toBe(null)
    })

    it('should return with mode WEB when doesnt have global object', () => {
      ;(getMarketplaceGlobalsByKey as jest.Mock).mockImplementation(() => undefined)
      const validQuery = '?code=TOKEN&state=DEVELOPER,DESKTOP'
      ;(window.location as any).origin = 'some.origin'
      const cognitoClientId = 'cognitoClientId'
      expect(getTokenFromQueryString(validQuery, cognitoClientId)).toEqual({
        loginType: 'CLIENT',
        mode: 'WEB',
        cognitoClientId,
        authorizationCode: 'TOKEN',
        redirectUri: 'some.origin',
        state: 'DEVELOPER,DESKTOP',
        refreshToken: null,
        userName: null,
      })
    })
  })

  describe('deserializeIdToken', () => {
    it('should return a deserialized identity if passed a login with idToken', () => {
      expect(deserializeIdToken(mockLoginSession)).toEqual({
        developerId: 'SOME_DEV_ID',
        clientId: 'SOME_CLIENT_ID',
        adminId: 'SOME_ADMIN_ID',
        email: 'SOME_EMAIL',
        name: 'SOME_NAME',
        userCode: 'SOME_USER_CODE',
      })
    })

    it('should return a nulled identity if passed an undefined token', () => {
      expect(deserializeIdToken(undefined)).toEqual({
        developerId: null,
        clientId: null,
        adminId: null,
        email: undefined,
        name: undefined,
        userCode: null,
      })
    })
  })

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

  describe('checkHasIdentityId', () => {
    it('should return true if loginType CLIENT and has CLIENT_ID', () => {
      const loginType = 'CLIENT'
      const loginIdentity = {
        clientId: 'SOME_CLIENT_ID',
      } as LoginIdentity
      expect(checkHasIdentityId(loginType, loginIdentity)).toBe(true)
    })

    it('should return true if loginType DEVELOPER and has DEVELOPER_ID', () => {
      const loginType = 'DEVELOPER'
      const loginIdentity = {
        developerId: 'SOME_DEVELOPER_ID',
      } as LoginIdentity
      expect(checkHasIdentityId(loginType, loginIdentity)).toBe(true)
    })

    it('should return true if loginType ADMIN and has ADMIN_ID', () => {
      const loginType = 'ADMIN'
      const loginIdentity = {
        adminId: 'SOME_ADMIN_ID',
      } as LoginIdentity
      expect(checkHasIdentityId(loginType, loginIdentity)).toBe(true)
    })

    it('should return false if loginType CLIENT or any and has no clientId', () => {
      const loginType = 'CLIENT'
      const loginIdentity = {
        clientId: null,
      } as LoginIdentity
      expect(checkHasIdentityId(loginType, loginIdentity)).toBe(false)
    })
  })

  describe('redirectToOAuth', () => {
    it('should redirect to the OAuth endpoint for authorize', () => {
      window.location.href = ''
      process.env.COGNITO_OAUTH_URL = ''
      redirectToOAuth('cognitoClientId', 'redirectUri', 'DEVELOPER')
      expect(window.location.href).toEqual(
        '/authorize?response_type=code&client_id=cognitoClientId&redirect_uri=redirectUri&state=DEVELOPER',
      )
    })
  })

  describe('redirectToLogin', () => {
    it('should redirect to the OAuth endpoint for login', () => {
      window.location.href = ''
      process.env.COGNITO_OAUTH_URL = ''
      redirectToLogin('cognitoClientId', 'redirectUri', 'DEVELOPER')
      expect(window.location.href).toEqual(
        '/login?response_type=code&client_id=cognitoClientId&redirect_uri=redirectUri&state=DEVELOPER',
      )
    })
  })

  describe('redirectToLogout', () => {
    it('should redirect to the OAuth endpoint for logout', () => {
      window.location.href = ''
      process.env.COGNITO_OAUTH_URL = ''
      redirectToLogout('cognitoClientId', 'redirectUri', 'DEVELOPER')
      expect(window.location.href).toEqual('/logout?client_id=cognitoClientId&logout_uri=redirectUri&state=DEVELOPER')
    })
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })
})
