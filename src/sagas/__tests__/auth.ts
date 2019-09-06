import { cloneableGenerator } from '@redux-saga/testing-utils'
import authSagas, { doLogin, doLogout, loginListen, logoutListen } from '../auth'
import ActionTypes from '../../constants/action-types'
import { put, all, takeLatest, call } from '@redux-saga/core/effects'
import { authLoginSuccess, authLogoutSuccess, authLoginFailure } from '../../actions/auth'
import { Action } from '@/types/core'
import { fetcher, LoginType, LoginParams, COGNITO_API_BASE_URL, COGNITO_HEADERS } from '@reapit/elements'
import { removeLoginSession, setLoginSession } from '../../utils/session'
import { history } from '../../core/router'
import Routes from '../../constants/routes'
import { mockLoginSession } from '../../utils/__mocks__/session'

jest.mock('../../utils/session')
jest.mock('../../core/router', () => ({
  history: {
    push: jest.fn()
  }
}))

describe('auth thunks', () => {
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
