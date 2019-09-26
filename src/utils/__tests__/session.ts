import { getAccessToken } from '../session'
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
  describe('getAccessToken', () => {
    it('should correctly return null when app is not online', () => {
      getAccessToken()
      expect(store.dispatch).toHaveBeenCalledWith(authLogout())
    })

    it('should correctly return null when sessions are not available', () => {
      store.state.auth.loginSession = null
      store.state.auth.refreshSession = null
      getAccessToken()
      expect(store.dispatch).toHaveBeenCalledWith(authLogout())
    })

    it('should logout user when need to get refreshed session but it is not correct', () => {
      store.state.auth.loginSession = null
      store.state.auth.refreshSession = {} as RefreshParams
      getAccessToken()
      expect(store.dispatch).toHaveBeenCalledTimes(0)
    })

    it('should correctly return value', () => {
      store.state.auth.loginSession = {} as LoginSession
      store.state.auth.refreshSession = {} as RefreshParams
      getAccessToken()
      expect(store.dispatch).toHaveBeenCalledTimes(0)
    })

    afterEach(() => {
      jest.resetAllMocks()
    })
  })
})
