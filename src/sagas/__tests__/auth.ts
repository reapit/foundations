import authSagas, { doLogin, doLogout, loginListen, logoutListen, clearAuthListen, clearAuth } from '../auth'
import ActionTypes from '../../constants/action-types'
import { put, all, takeLatest, call, fork } from '@redux-saga/core/effects'
import { authLoginSuccess, authLogoutSuccess, authLoginFailure, authClear } from '../../actions/auth'
import { Action } from '@/types/core'
import { getCognitoSession, removeSessionCookie, LoginParams } from '@reapit/elements'
import { history } from '../../core/router'
import Routes from '../../constants/routes'
import { mockLoginSession } from '@/utils/__mocks__/cognito'
import { ActionType } from '../../types/core'
import { cloneableGenerator } from '@redux-saga/testing-utils'

jest.mock('../../utils/session')
jest.mock('../../core/router', () => ({
  history: {
    push: jest.fn()
  }
}))
jest.mock('../../core/store')
jest.mock('@reapit/elements')

describe('login submit', () => {
  const loginParams: LoginParams = { loginType: 'CLIENT', userName: 'bob@acme.com', password: 'xxxxxx', mode: 'WEB' }
  const action: Action<LoginParams> = {
    type: ActionTypes.AUTH_LOGIN as ActionType,
    data: loginParams
  }

  it('api call success', () => {
    const gen = doLogin(action)
    expect(gen.next(mockLoginSession).value).toEqual(call(getCognitoSession, loginParams))
    expect(gen.next(mockLoginSession).value).toEqual(put(authLoginSuccess(mockLoginSession)))
    expect(gen.next().done).toBe(true)
  })

  test('api call fail', () => {
    const gen = doLogin(action)
    expect(gen.next(null).value).toEqual(call(getCognitoSession, loginParams))
    expect(gen.next(null).value).toEqual(put(authLoginFailure()))
    expect(gen.next().done).toBe(true)
  })
})

describe('auth thunks', () => {
  describe('authLogout', () => {
    it('should redirect to login page', () => {
      const gen = doLogout()
      expect(gen.next().value).toEqual(call(removeSessionCookie))
      gen.next()
      expect(history.push).toHaveBeenCalledTimes(1)
      expect(history.push).toHaveBeenLastCalledWith(Routes.CLIENT_LOGIN)
      expect(gen.next().value).toEqual(put(authLogoutSuccess()))
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

  describe('clearAuthListen', () => {
    it('should trigger logout action', () => {
      const gen = clearAuthListen()

      expect(gen.next().value).toEqual(takeLatest(ActionTypes.AUTH_CLEAR, clearAuth))
      expect(gen.next().done).toBe(true)
    })
  })

  describe('itemSagas', () => {
    it('should wait for login and logout action get called', () => {
      const gen = authSagas()

      expect(gen.next().value).toEqual(all([fork(loginListen), fork(logoutListen), fork(clearAuthListen)]))
      expect(gen.next().done).toBe(true)
    })
  })

  describe('clearAuth', () => {
    it('should run correctly', () => {
      const gen = cloneableGenerator(clearAuth)()
      expect(gen.next().value).toEqual(call(removeSessionCookie))
      expect(gen.next().value).toEqual(put(authLogoutSuccess()))
      expect(gen.next().done).toBe(true)
    })
  })
})
