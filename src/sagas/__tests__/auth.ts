import authSagas, { doLogin, doLogout, loginListen, logoutListen } from '../auth'
import ActionTypes from '../../constants/action-types'
import { put, all, take, takeLatest, call } from '@redux-saga/core/effects'
import { authLoginSuccess, authLogoutSuccess, AuthLoginParams } from '../../actions/auth'
import { Action } from '@/types/core'

describe('auth thunks', () => {
  describe('authLogin', () => {
    it('should redirect to an auth page', () => {
      const gen = doLogin({ data: { loginType: 'CLIENT' } } as Action<AuthLoginParams>)
      expect(gen.next().value).toEqual(put(authLoginSuccess()))
      expect(gen.next().done).toBe(true)
    })
  })

  describe('authLogout', () => {
    it('should redirect to login page', () => {
      const gen = doLogout()

      expect(gen.next().value).toEqual(put(authLogoutSuccess()))
      expect(gen.next().done).toBe(true)
    })
  })

  describe('authLoginListen', () => {
    it('should trigger login action', () => {
      const gen = loginListen()

      expect(gen.next().value).toEqual(take(ActionTypes.AUTH_LOGIN))
      expect(gen.next({}).value).toEqual(call(doLogin, {} as Action<AuthLoginParams>))
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
