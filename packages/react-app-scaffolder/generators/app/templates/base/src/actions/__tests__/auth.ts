import {
  authLogin,
  authLoginSuccess,
  authLoginFailure,
  authLogout,
  authLogoutSuccess,
  authSetRefreshSession,
} from '../auth'
import ActionTypes from '../../constants/action-types'

describe('auth actions', () => {
  it('should create correct actions', () => {
    expect(authLogin.type).toEqual(ActionTypes.AUTH_LOGIN)
    expect(authLoginSuccess.type).toEqual(ActionTypes.AUTH_LOGIN_SUCCESS)
    expect(authLoginFailure.type).toEqual(ActionTypes.AUTH_LOGIN_FAILURE)
    expect(authLogout.type).toEqual(ActionTypes.AUTH_LOGOUT)
    expect(authLogoutSuccess.type).toEqual(ActionTypes.AUTH_LOGOUT_SUCCESS)
    expect(authSetRefreshSession.type).toEqual(ActionTypes.AUTH_SET_REFRESH_SESSION)
  })
})
