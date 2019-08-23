import authSagas, { doLogin, doLogout, loginListen, logoutListen } from '../auth'
import ActionTypes from '../../constants/action-types'
import { put, all, takeLatest, call } from '@redux-saga/core/effects'
import { authLoginSuccess, authLogoutSuccess, AuthLoginParams, authLoginFailure } from '../../actions/auth'
import { Action } from '@/types/core'
import { fetcher } from '@reapit/elements'
import { removeLoginSession, setLoginSession } from '../../utils/session'
import { history } from '../../core/router'
import Routes from '../../constants/routes'
import { LoginType } from '../../reducers/auth'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import { COGNITO_HEADERS, COGNITO_API_BASE_URL } from '@/constants/api'
import { mockLoginSession } from '@/utils/__mocks__/cognito'

jest.mock('@reapit/elements')
jest.mock('../../utils/cognito')
jest.mock('../../utils/session')
jest.mock('../../core/router', () => ({
  history: {
    push: jest.fn()
  }
}))

describe('login submit', () => {
  const data: AuthLoginParams = { loginType: 'CLIENT', email: 'bob@acme.com', password: 'xxxxxx' }
  const gen = cloneableGenerator(doLogin)({ data } as Action<AuthLoginParams>)
  expect(gen.next().value).toEqual(
    call(fetcher, {
      url: `/login`,
      api: COGNITO_API_BASE_URL,
      method: 'POST',
      body: { userName: data.email, password: data.password },
      headers: COGNITO_HEADERS
    })
  )

  test('api call success', () => {
    const clone = gen.clone()
    expect(clone.next(mockLoginSession).value).toEqual(call(setLoginSession, mockLoginSession))
    expect(clone.next(mockLoginSession).value).toEqual(put(authLoginSuccess(mockLoginSession)))
    expect(clone.next().done).toBe(true)
  })

  test('api call fail', () => {
    const clone = gen.clone()
    expect(clone.next(undefined).value).toEqual(put(authLoginFailure()))
    expect(clone.next().done).toBe(true)
  })
})

describe('auth thunks', () => {
  describe('authLogout', () => {
    it('should redirect to login page', () => {
      const gen = doLogout({ data: 'CLIENT' } as Action<LoginType>)
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
