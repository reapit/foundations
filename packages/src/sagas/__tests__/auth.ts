import authSagas, { doLogin, doLogout, loginListen, logoutListen } from '../auth'
import ActionTypes from '../../constants/action-types'
import { put, all, takeLatest, call } from '@redux-saga/core/effects'
import { LoginParams, setUserSession, removeSession, redirectToLogout } from '@reapit/cognito-auth'
import { Action, ActionType } from '@/types/core'
import { mockLoginSession } from '../../utils/__mocks__/session'
import { authLoginSuccess, authLoginFailure } from '@/actions/auth'
import { COOKIE_SESSION_KEY } from '../../constants/api'

jest.mock('../../utils/session')
jest.mock('../../core/store.ts')
jest.mock('../../core/router', () => ({
  history: {
    push: jest.fn(),
  },
}))

jest.mock('@reapit/cognito-auth', () => ({
  setUserSession: jest.fn(),
  removeSession: jest.fn(),
  redirectToLogout: jest.fn(),
}))

describe('auth sagas', () => {
  describe('login submit', () => {
    const loginParams: LoginParams = {
      loginType: 'CLIENT',
      userName: 'bob@acme.com',
      password: 'xxxxxx',
      mode: 'WEB',
      cognitoClientId: '123',
    }
    const action: Action<LoginParams> = {
      type: ActionTypes.AUTH_LOGIN as ActionType,
      data: loginParams,
    }

    test('login success', () => {
      const gen = doLogin(action)
      expect(gen.next(mockLoginSession).value).toEqual(call(setUserSession, loginParams))
      expect(gen.next(mockLoginSession).value).toEqual(put(authLoginSuccess(mockLoginSession)))
      expect(gen.next().done).toBe(true)
    })

    test('login fail', () => {
      const gen = doLogin(action)
      expect(gen.next(null).value).toEqual(call(setUserSession, loginParams))
      expect(gen.next(null).value).toEqual(put(authLoginFailure()))
      expect(gen.next().done).toBe(true)
    })
  })

  describe('authLogout', () => {
    it('should redirect to login page', () => {
      const gen = doLogout()
      expect(gen.next().value).toEqual(call(removeSession, COOKIE_SESSION_KEY))
      expect(gen.next().value).toEqual(
        call(redirectToLogout, window.reapit.config.cognitoClientId, `${window.location.origin}/login`),
      )
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
