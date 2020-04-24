import { select, put, all, takeLatest, call, fork } from '@redux-saga/core/effects'
import { setUserSession, removeSession, LoginParams, LoginSession, redirectToLogout } from '@reapit/cognito-auth'
import { Action } from '@/types/core'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import {
  getCookieString,
  setCookieString,
  COOKIE_MAX_AGE_INFINITY,
  COOKIE_DEVELOPER_TERMS_ACCEPTED,
  COOKIE_CLIENT_TERMS_ACCEPTED,
} from '@/utils/cookie'
import authSagas, {
  doLogin,
  doLogout,
  loginListen,
  logoutListen,
  clearAuthListen,
  clearAuth,
  setInitDeveloperTermsAcceptedStateFromCookie,
  setDeveloperTermAcceptedCookieAndState,
  setInitDeveloperTermsAcceptedStateFromCookieListen,
  setDeveloperTermAcceptedCookieAndStateListen,
  setClientTermAcceptedCookieAndState,
  setInitClientTermsAcceptedStateFromCookieListen,
  setInitClientTermsAcceptedStateFromCookie,
  setClientTermAcceptedCookieAndStateListen,
} from '../auth'
import ActionTypes from '../../constants/action-types'
import { authLoginSuccess, authLogoutSuccess, authLoginFailure, setTermsAcceptedState } from '../../actions/auth'
import Routes from '../../constants/routes'
import { ActionType } from '../../types/core'
import { COOKIE_SESSION_KEY_MARKETPLACE } from '../../constants/api'
import { selectLoginType } from '@/selector/auth'

jest.mock('../../utils/session')
jest.mock('../../core/router', () => ({
  history: {
    push: jest.fn(),
  },
}))
jest.mock('../../core/store')
jest.mock('@reapit/cognito-auth')

/* mock to make new Date() a consistent value */
const RealDate = Date

function mockDate() {
  global.Date = class extends RealDate {
    constructor() {
      super()
      return new RealDate('2017-06-13T04:41:20') as Date
    }
  } as any
}

beforeEach(() => {
  mockDate()
})
afterEach(() => {
  global.Date = RealDate
})

export const mockLoginSession = {
  userName: 'bob@acme.com',
  accessTokenExpiry: 2,
  loginType: 'CLIENT',
  refreshToken: 'MOCK_REFRESH_TOKEN',
  accessToken: 'MOCK_ACCESS_TOKEN',
  idToken: 'MOCK_ID_TOKEN',
  loginIdentity: {
    developerId: 'SOME_DEV_ID',
    clientId: 'SOME_CLIENT_ID',
    adminId: 'SOME_ADMIN_ID',
  },
} as LoginSession

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

  it('api call success', () => {
    const gen = doLogin(action)
    expect(gen.next(mockLoginSession).value).toEqual(call(setUserSession, loginParams))
    expect(gen.next(mockLoginSession).value).toEqual(put(authLoginSuccess(mockLoginSession)))
    expect(gen.next().done).toBe(true)
  })

  test('api call fail', () => {
    const gen = doLogin(action)
    expect(gen.next(null).value).toEqual(call(setUserSession, loginParams))
    expect(gen.next(null).value).toEqual(put(authLoginFailure()))
    expect(gen.next().done).toBe(true)
  })
})

describe('auth thunks', () => {
  describe('authLogout', () => {
    it('should redirect to login page', () => {
      const gen = doLogout()
      expect(gen.next().value).toEqual(call(removeSession, COOKIE_SESSION_KEY_MARKETPLACE))
      expect(gen.next().value).toEqual(
        call(
          redirectToLogout,
          window.reapit.config.marketplaceApiUrl,
          `${window.location.origin}${Routes.CLIENT_LOGIN}`,
        ),
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

      expect(gen.next().value).toEqual(
        all([
          fork(loginListen),
          fork(logoutListen),
          fork(clearAuthListen),
          fork(setInitDeveloperTermsAcceptedStateFromCookieListen),
          fork(setDeveloperTermAcceptedCookieAndStateListen),
          fork(setInitClientTermsAcceptedStateFromCookieListen),
          fork(setClientTermAcceptedCookieAndStateListen),
        ]),
      )
      expect(gen.next().done).toBe(true)
    })
  })

  describe('clearAuth', () => {
    it('should run correctly', () => {
      const gen = cloneableGenerator(clearAuth)()
      expect(gen.next().value).toEqual(call(removeSession))
      expect(gen.next().value).toEqual(put(authLogoutSuccess()))
      expect(gen.next().done).toBe(true)
    })
  })

  describe('setInitClientTermsAcceptedStateFromCookie', () => {
    it('should run correctly with developer login type', () => {
      const gen = cloneableGenerator(setInitClientTermsAcceptedStateFromCookie)()
      expect(gen.next().value).toEqual(select(selectLoginType))
      expect(gen.next('CLIENT').value).toEqual(call(getCookieString, COOKIE_CLIENT_TERMS_ACCEPTED))
      expect(gen.next('2019-12-18T16:30:00').value).toEqual(put(setTermsAcceptedState(true)))
      expect(gen.next().done).toBe(true)
    })

    it('should run correctly with other login type', () => {
      const gen = cloneableGenerator(setInitClientTermsAcceptedStateFromCookie)()
      expect(gen.next().value).toEqual(select(selectLoginType))
      expect(gen.next('DEVELOPER').done).toBe(true)
    })
  })

  describe('setClientTermAcceptedCookieAndState', () => {
    it('should run correctly with true', () => {
      const gen = cloneableGenerator(setClientTermAcceptedCookieAndState)({ data: true })
      expect(gen.next().value).toEqual(
        call(setCookieString, COOKIE_CLIENT_TERMS_ACCEPTED, new Date(), COOKIE_MAX_AGE_INFINITY),
      )
      expect(gen.next().value).toEqual(put(setTermsAcceptedState(true)))
      expect(gen.next().done).toBe(true)
    })

    it('should run correctly with false', () => {
      const gen = cloneableGenerator(setClientTermAcceptedCookieAndState)({ data: false })
      expect(gen.next().value).toEqual(put(setTermsAcceptedState(false)))
      expect(gen.next().done).toBe(true)
    })
  })

  describe('setInitDeveloperTermsAcceptedStateFromCookie', () => {
    it('should run correctly with developer login type', () => {
      const gen = cloneableGenerator(setInitDeveloperTermsAcceptedStateFromCookie)()
      expect(gen.next().value).toEqual(select(selectLoginType))
      expect(gen.next('DEVELOPER').value).toEqual(call(getCookieString, COOKIE_DEVELOPER_TERMS_ACCEPTED))
      expect(gen.next('2019-12-18T16:30:00').value).toEqual(put(setTermsAcceptedState(true)))
      expect(gen.next().done).toBe(true)
    })

    it('should run correctly with other login type', () => {
      const gen = cloneableGenerator(setInitDeveloperTermsAcceptedStateFromCookie)()
      expect(gen.next().value).toEqual(select(selectLoginType))
      expect(gen.next('CLIENT').done).toBe(true)
    })
  })

  describe('setDeveloperTermAcceptedCookieAndState', () => {
    it('should run correctly with true', () => {
      const gen = cloneableGenerator(setDeveloperTermAcceptedCookieAndState)({ data: true })
      expect(gen.next().value).toEqual(
        call(setCookieString, COOKIE_DEVELOPER_TERMS_ACCEPTED, new Date(), COOKIE_MAX_AGE_INFINITY),
      )
      expect(gen.next().value).toEqual(put(setTermsAcceptedState(true)))
      expect(gen.next().done).toBe(true)
    })

    it('should run correctly with false', () => {
      const gen = cloneableGenerator(setDeveloperTermAcceptedCookieAndState)({ data: false })
      expect(gen.next().value).toEqual(put(setTermsAcceptedState(false)))
      expect(gen.next().done).toBe(true)
    })
  })

  describe('setInitDeveloperTermsAcceptedStateFromCookieListen', () => {
    it('should run correctly', () => {
      const gen = setInitDeveloperTermsAcceptedStateFromCookieListen()
      expect(gen.next().value).toEqual(
        takeLatest(
          ActionTypes.SET_INIT_DEVELOPER_TERMS_ACCEPTED_STATE_FROM_COOKIE,
          setInitDeveloperTermsAcceptedStateFromCookie,
        ),
      )
      expect(gen.next().done).toBe(true)
    })
  })

  describe('setDeveloperTermAcceptedCookieAndStateListen', () => {
    it('should run correctly', () => {
      const gen = setDeveloperTermAcceptedCookieAndStateListen()
      expect(gen.next().value).toEqual(
        takeLatest<Action<boolean>>(
          ActionTypes.SET_DEVELOPER_TERM_ACCEPTED_COOKIE_AND_STATE,
          setDeveloperTermAcceptedCookieAndState,
        ),
      )
      expect(gen.next().done).toBe(true)
    })
  })

  describe('setInitClientTermsAcceptedStateFromCookieListen', () => {
    it('should run correctly', () => {
      const gen = setInitDeveloperTermsAcceptedStateFromCookieListen()
      expect(gen.next().value).toEqual(
        takeLatest(
          ActionTypes.SET_INIT_DEVELOPER_TERMS_ACCEPTED_STATE_FROM_COOKIE,
          setInitDeveloperTermsAcceptedStateFromCookie,
        ),
      )
      expect(gen.next().done).toBe(true)
    })
  })

  describe('setClientTermAcceptedCookieAndStateListen', () => {
    it('should run correctly', () => {
      const gen = setDeveloperTermAcceptedCookieAndStateListen()
      expect(gen.next().value).toEqual(
        takeLatest<Action<boolean>>(
          ActionTypes.SET_DEVELOPER_TERM_ACCEPTED_COOKIE_AND_STATE,
          setDeveloperTermAcceptedCookieAndState,
        ),
      )
      expect(gen.next().done).toBe(true)
    })
  })
})
