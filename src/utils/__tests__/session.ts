import {
  setLoginSession,
  getLoginSession,
  removeLoginSession,
  getTokenFromQueryString,
  verifyAccessToken
} from '../session'
import { LOCAL_STORAGE_SESSION_KEY } from '../../constants/session'
import { mockLoginSession } from '../__mocks__/session'
import { authLogout } from '@/actions/auth'

import store from '@/core/store'
import { LoginSession, RefreshParams } from '@reapit/elements'

jest.mock('@reapit/elements')
jest.mock('@/core/store', () => ({
  dispatch: jest.fn(),
  state: {
    online: {},
    auth: {}
  }
}))

describe('session utils', () => {
  describe('setLoginSession', () => {
    it('should correctly set localStorage', () => {
      jest.spyOn(window.localStorage, 'setItem')
      setLoginSession(mockLoginSession)
      expect(window.localStorage.setItem).toHaveBeenCalledWith(
        LOCAL_STORAGE_SESSION_KEY,
        JSON.stringify(mockLoginSession)
      )
    })
  })

  describe('getLoginSession', () => {
    describe('getLoginSession', () => {
      it('should correctly set localStorage', () => {
        window.localStorage[LOCAL_STORAGE_SESSION_KEY] = mockLoginSession
        jest.spyOn(window.localStorage, 'getItem')
        const result = getLoginSession()
        expect(window.localStorage.getItem).toHaveBeenCalledWith(LOCAL_STORAGE_SESSION_KEY)
        expect(result).toEqual(mockLoginSession)
      })
    })
  })

  describe('removeLoginSession', () => {
    it('should correctly set localStorage', () => {
      window.localStorage[LOCAL_STORAGE_SESSION_KEY] = mockLoginSession
      jest.spyOn(window.localStorage, 'removeItem')
      removeLoginSession()
      expect(window.localStorage.removeItem).toHaveBeenCalledWith(LOCAL_STORAGE_SESSION_KEY)
      expect(window.localStorage.getItem(LOCAL_STORAGE_SESSION_KEY)).toBeUndefined()
    })
  })

  describe('getTokenFromQueryString', () => {
    it('should correctly return RefreshParams', () => {
      const validQuery = '?username=wmcvay@reapit.com&desktopToken=TOKEN'
      expect(getTokenFromQueryString(validQuery)).toEqual({
        refreshToken: 'TOKEN',
        userName: 'wmcvay@reapit.com',
        loginType: 'CLIENT'
      })
    })

    it('should correctly return null for an invalid string', () => {
      const invalidQuery = '?somerandomquery=wmcvay@reapit.com&somerandomtoken=TOKEN'
      expect(getTokenFromQueryString(invalidQuery)).toBe(null)
    })
  })

  describe('verifyAccessToken', () => {
    it('should correctly return null when app is not online', () => {
      store.state.online.value = false
      verifyAccessToken()
      expect(store.dispatch).toHaveBeenCalledWith(authLogout())
    })

    it('should correctly return null when sessions are not available', () => {
      store.state.online.value = true
      store.state.auth.loginSession = null
      store.state.auth.desktopSession = null
      verifyAccessToken()
      expect(store.dispatch).toHaveBeenCalledWith(authLogout())
    })

    it('should logout user when need to get refreshed session but it is not correct', () => {
      store.state.online.value = true
      store.state.auth.loginSession = null
      store.state.auth.desktopSession = {} as RefreshParams
      verifyAccessToken()
      expect(store.dispatch).toHaveBeenCalledTimes(0)
    })

    it('should correctly return value', () => {
      store.state.online.value = true
      store.state.auth.loginSession = {} as LoginSession
      store.state.auth.desktopSession = {} as RefreshParams
      verifyAccessToken()
      expect(store.dispatch).toHaveBeenCalledTimes(0)
    })

    afterEach(() => {
      jest.resetAllMocks()
    })
  })
})
