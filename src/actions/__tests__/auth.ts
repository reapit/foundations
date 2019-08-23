import {
  authLogin,
  authLoginFailure,
  authLoginSuccess,
  authLogout,
  authLogoutSuccess,
  authChangeLoginType,
  authSetDesktopSession
} from '../auth'
import ActionTypes from '../../constants/action-types'
import { LoginType, LoginSession } from '@reapit/elements'

describe('auth actions', () => {
  it('should create a authLogin action', () => {
    expect(authLogin.type).toEqual(ActionTypes.AUTH_LOGIN)
  })

  it('should create a authLoginSuccess action', () => {
    const loginSession = {
      loginType: 'CLIENT' as LoginType,
      userName: 'bob@acme.com',
      accessTokenExpiry: 1,
      accessToken: '',
      refreshToken: ''
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

  it('should create a authChangeLoginType action', () => {
    expect(authChangeLoginType.type).toEqual(ActionTypes.AUTH_CHANGE_LOGIN_TYPE)
    expect(authChangeLoginType('CLIENT').data).toEqual('CLIENT')
  })

  it('should create a authSetDesktopSession action', () => {
    const refreshParams = {
      loginType: 'CLIENT' as LoginType,
      refreshToken: 'REFRESH_TOKEN',
      userName: 'bob@acme.com'
    }
    expect(authSetDesktopSession.type).toEqual(ActionTypes.AUTH_SET_DESKTOP_SESSION)
    expect(authSetDesktopSession(refreshParams).data).toEqual(refreshParams)
  })
})
