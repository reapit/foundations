import {
  authLogin,
  authLoginFailure,
  authLoginSuccess,
  authLogout,
  authLogoutSuccess,
  authChangeLoginType
} from '../auth'
import ActionTypes from '../../constants/action-types'
import { LoginType } from '../../reducers/auth'

describe('auth actions', () => {
  it('should create a authLogin action', () => {
    expect(authLogin.type).toEqual(ActionTypes.AUTH_LOGIN)
  })

  it('should create a authLoginSuccess action', () => {
    const loginSession = {
      loginType: 'CLIENT' as LoginType,
      userName: 'bob@acme.com',
      accessToken: '',
      refreshToken: '',
      sessionExpiry: 1
    }
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
})
