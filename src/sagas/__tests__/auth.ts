import authSagas, { doLogin, doLogout, loginListen, logoutListen } from '../auth'
import ActionTypes from '../../constants/action-types'
import { put, all, takeLatest } from '@redux-saga/core/effects'
import { authLogoutSuccess } from '../../actions/auth'
import { removeLoginSession } from '../../utils/session'
import { history } from '../../core/router'
import Routes from '../../constants/routes'

jest.mock('../../utils/session')
jest.mock('../../core/store')
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
