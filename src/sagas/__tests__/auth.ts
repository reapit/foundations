import authSagas, { doLogin, doLogout, loginListen, logoutListen } from '../auth'
import ActionTypes from '../../constants/action-types'
import { put, all, take, takeLatest, call } from '@redux-saga/core/effects'
import { authLoginSuccess, authLogoutSuccess, AuthLoginParams } from '../../actions/auth'
import { Action } from '@/types/core'
import { cognitoLogin } from '../../utils/cognito'
import { removeLoginSession, setLoginSession } from '../../utils/session'
import { history } from '../../core/router'
import Routes from '../../constants/routes'

jest.mock('../../utils/cognito')
jest.mock('../../utils/session')
jest.mock('../../core/router', () => ({
  history: {
    push: jest.fn()
  }
}))

describe('auth thunks', () => {
  describe('authLogin', () => {
    it('should correctly login', () => {
      const data: AuthLoginParams = { loginType: 'CLIENT', email: 'bob@acme.com', password: 'xxxxxx' }
      const gen = doLogin({ data } as Action<AuthLoginParams>)
      const loginParams = {
        userName: data.email,
        password: data.password,
        loginType: data.loginType
      }
      expect(gen.next().value).toEqual(call(cognitoLogin, loginParams))
      gen.next()
      expect(setLoginSession).toHaveBeenCalledTimes(1)
      expect(gen.next().value).toEqual(put(authLoginSuccess(undefined as any)))
      expect(gen.next().done).toBe(true)
    })
  })

  describe('authLogout', () => {
    it('should redirect to login page', () => {
      const gen = doLogout()
      gen.next()
      expect(removeLoginSession).toHaveBeenCalledTimes(1)
      expect(gen.next().value).toEqual(put(authLogoutSuccess()))
      gen.next()
      expect(history.push).toHaveBeenCalledTimes(1)
      expect(history.push).toHaveBeenLastCalledWith(Routes.LOGIN)
      expect(gen.next().done).toBe(true)
    })
  })

  describe('authLoginListen', () => {
    it('should trigger login action', () => {
      const gen = loginListen()

      expect(gen.next().value).toEqual(takeLatest(ActionTypes.AUTH_LOGIN, doLogin))
      expect(gen.next().done).toBe(true)
    })
  })

  describe('authLogoutListen', () => {
    it('should trigger logout action', () => {
      const gen = logoutListen()

      expect(gen.next().value).toEqual(takeLatest(ActionTypes.AUTH_LOGOUT, doLogout))
      expect(gen.next().done).toBe(true)
    })
  })

  describe('itemSagas', () => {
    it('should wait for login and logout action get called', () => {
      const gen = authSagas()

      expect(gen.next().value).toEqual(all([loginListen(), logoutListen()]))
      expect(gen.next().done).toBe(true)
    })
  })
})
