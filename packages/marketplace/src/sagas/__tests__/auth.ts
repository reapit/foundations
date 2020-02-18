import MockDate from 'mockdate'
import { select, put, all, takeLatest, call, fork } from '@redux-saga/core/effects'
import { setUserSession, removeSession, LoginParams, LoginSession, redirectToLogout } from '@reapit/cognito-auth'
import { Action } from '@/types/core'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import {
  getCookieString,
  setCookieString,
  COOKIE_FIRST_TIME_LOGIN,
  COOKIE_TERMS_ACCEPTED,
  COOKIE_MAX_AGE_INFINITY,
} from '@/utils/cookie'
import authSagas, {
  doLogin,
  doLogout,
  loginListen,
  logoutListen,
  clearAuthListen,
  clearAuth,
  setFirstLoginListen,
  setFirstTimeLogin,
  checkFirstTimeLoginListen,
  checkFirstTimeLogin,
  setTermsAcceptedWithCookieHelper,
  checkTermsAcceptedWithCookieHelper,
  checkTermsAcceptedListen,
  setTermsAcceptedListen,
} from '../auth'
import ActionTypes from '../../constants/action-types'
import {
  authLoginSuccess,
  authLogoutSuccess,
  authLoginFailure,
  toggleFirstLogin,
  setTermsAcceptedState,
} from '../../actions/auth'
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
          process.env.COGNITO_CLIENT_ID_MARKETPLACE as string,
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

  describe('checkFirstTimeLoginListen', () => {
    it('should trigger checkFirstTimeLogin action', () => {
      const gen = checkFirstTimeLoginListen()
      expect(gen.next().value).toEqual(takeLatest(ActionTypes.CHECK_FIRST_TIME_LOGIN, checkFirstTimeLogin))
      expect(gen.next().done).toBe(true)
    })
  })

  describe('setFirstLoginListen', () => {
    it('should trigger setFirstTimeLogin action', () => {
      const gen = setFirstLoginListen()
      expect(gen.next().value).toEqual(takeLatest(ActionTypes.USER_ACCEPT_TERM_AND_CONDITION, setFirstTimeLogin))
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
          fork(checkFirstTimeLoginListen),
          fork(setFirstLoginListen),
          fork(checkTermsAcceptedListen),
          fork(setTermsAcceptedListen),
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

  describe('setFirstTimeLogin', () => {
    it('should run correctly', () => {
      const TIME_OFFSET = 0
      MockDate.set('2019-12-18T16:30:00', TIME_OFFSET)
      const gen = cloneableGenerator(setFirstTimeLogin)()
      expect(gen.next().value).toEqual(
        call(setCookieString, COOKIE_FIRST_TIME_LOGIN, new Date(), COOKIE_MAX_AGE_INFINITY),
      )
      expect(gen.next().value).toEqual(put(toggleFirstLogin(false)))
      expect(gen.next().done).toBe(true)
      MockDate.reset()
    })
  })

  describe('checkFirstTimeLogin', () => {
    it('should run correctly', () => {
      const gen = cloneableGenerator(checkFirstTimeLogin)()
      expect(gen.next().value).toEqual(call(getCookieString, COOKIE_FIRST_TIME_LOGIN))
      expect(gen.next().value).toEqual(put(toggleFirstLogin(true)))
      expect(gen.next().done).toBe(true)
    })
  })

  describe('checkTermsAcceptedWithCookie', () => {
    it('should run correctly with developer login type', () => {
      const gen = cloneableGenerator(checkTermsAcceptedWithCookieHelper)()
      expect(gen.next().value).toEqual(select(selectLoginType))
      expect(gen.next('DEVELOPER').value).toEqual(call(getCookieString, COOKIE_TERMS_ACCEPTED))
      expect(gen.next('2019-12-18T16:30:00').value).toEqual(put(setTermsAcceptedState(true)))
      expect(gen.next().done).toBe(true)
    })

    it('should run correctly with other login type', () => {
      const gen = cloneableGenerator(checkTermsAcceptedWithCookieHelper)()
      expect(gen.next().value).toEqual(select(selectLoginType))
      expect(gen.next('CLIENT').done).toBe(true)
    })
  })

  describe('setTermsAcceptedWithCookieHelper', () => {
    it('should run correctly with true', () => {
      const gen = cloneableGenerator(setTermsAcceptedWithCookieHelper)({ data: true })
      expect(gen.next().value).toEqual(
        call(setCookieString, COOKIE_TERMS_ACCEPTED, new Date(), COOKIE_MAX_AGE_INFINITY),
      )
      expect(gen.next().value).toEqual(put(setTermsAcceptedState(true)))
      expect(gen.next().done).toBe(true)
    })

    it('should run correctly with false', () => {
      const gen = cloneableGenerator(setTermsAcceptedWithCookieHelper)({ data: false })
      expect(gen.next().value).toEqual(put(setTermsAcceptedState(false)))
      expect(gen.next().done).toBe(true)
    })
  })

  describe('checkTermsAcceptedListen', () => {
    it('should run correctly', () => {
      const gen = checkTermsAcceptedListen()
      expect(gen.next().value).toEqual(
        takeLatest(ActionTypes.CHECK_TERM_ACCEPTED_WITH_COOKIE, checkTermsAcceptedWithCookieHelper),
      )
      expect(gen.next().done).toBe(true)
    })
  })

  describe('setTermsAcceptedListen', () => {
    it('should run correctly', () => {
      const gen = setTermsAcceptedListen()
      expect(gen.next().value).toEqual(
        takeLatest<Action<boolean>>(ActionTypes.SET_TERMS_ACCEPTED_WITH_COOKIE, setTermsAcceptedWithCookieHelper),
      )
      expect(gen.next().done).toBe(true)
    })
  })
})
