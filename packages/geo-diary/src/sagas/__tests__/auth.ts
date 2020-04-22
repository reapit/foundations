import authSagas, { doLogin, doLogout, loginListen, logoutListen } from '../auth'
import ActionTypes from '../../constants/action-types'
import { put, all, takeLatest, call } from '@redux-saga/core/effects'
import { authLoginSuccess, authLoginFailure } from '../../actions/auth'
import { Action, ActionType } from '@/types/core'
import { mockLoginSession } from '@/utils/__mocks__/session'
import errorMessages from '@/constants/error-messages'
import { LoginParams, setUserSession, removeSession, redirectToLogout } from '@reapit/cognito-auth'
import { COOKIE_SESSION_KEY_GEO_DIARY } from '../../constants/api'

jest.mock('../../utils/session')

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
      cognitoClientId: 'cognitoClientId',
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
      expect(gen.next().value).toEqual(call(setUserSession, loginParams))
      expect(gen.throw(new Error(errorMessages.DEFAULT_SERVER_ERROR)).value).toEqual(put(authLoginFailure()))
      expect(gen.next().done).toBe(true)
    })
  })

  describe('authLogout', () => {
    it('should redirect to login page', () => {
      const gen = doLogout()

      expect(gen.next().value).toEqual(call(removeSession, COOKIE_SESSION_KEY_GEO_DIARY, 'development'))
      expect(gen.next().value).toEqual(
        call(redirectToLogout, window.reapit.config.cognitoClientId, `${window.location.origin}/login`),
      )
      expect(gen.next().done).toBe(true)
    })

    it('on logout fail', () => {
      const gen = doLogout()
      expect(gen.next().value).toEqual(call(removeSession, COOKIE_SESSION_KEY_GEO_DIARY, 'development'))
      gen.next(gen.throw(new Error(errorMessages.DEFAULT_SERVER_ERROR)).value)
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
