import {
  authLogin,
  authLoginFailure,
  authLoginSuccess,
  authLogout,
  authLogoutSuccess,
  authSetRefreshSession,
  authClear,
} from '../auth'
import ActionTypes from '../../constants/action-types'
import { LoginType, LoginSession, LoginMode } from '@reapit/cognito-auth'

describe('auth actions', () => {
  it('should create a authLogin action', () => {
    expect(authLogin.type).toEqual(ActionTypes.AUTH_LOGIN)
  })

  it('should create a authLoginSuccess action', () => {
    const loginSession = {
      loginType: 'ADMIN' as LoginType,
      userName: 'bob@acme.com',
      accessTokenExpiry: 1,
      accessToken: '',
      refreshToken: '',
    } as LoginSession
    expect(authLoginSuccess.type).toEqual(ActionTypes.AUTH_LOGIN_SUCCESS)
    expect(authLoginSuccess(loginSession).data).toEqual(loginSession)
  })

  it('should create a authLoginFailure action', () => {
    expect(authLoginFailure.type).toEqual(ActionTypes.AUTH_LOGIN_FAILURE)
  })

  it('should create a authLogout action', () => {
    expect(authLogout.type).toEqual(ActionTypes.AUTH_LOGOUT)
  })

  it('should create a authLogoutSuccess action', () => {
    expect(authLogoutSuccess.type).toEqual(ActionTypes.AUTH_LOGOUT_SUCCESS)
  })

  it('should create a authSetRefreshSession action', () => {
    const refreshParams = {
      loginType: 'ADMIN' as LoginType,
      refreshToken: 'REFRESH_TOKEN',
      userName: 'bob@acme.com',
      mode: 'DESKTOP' as LoginMode,
      cognitoClientId: 'cognitoClientId',
      authorizationCode: null,
      redirectUri: null,
      state: null,
    }
    expect(authSetRefreshSession.type).toEqual(ActionTypes.AUTH_SET_REFRESH_SESSION)
    expect(authSetRefreshSession(refreshParams).data).toEqual(refreshParams)
  })

  it('should create a authClear action', () => {
    expect(authClear.type).toEqual(ActionTypes.AUTH_CLEAR)
    expect(authClear().data).toEqual(undefined)
  })
})
