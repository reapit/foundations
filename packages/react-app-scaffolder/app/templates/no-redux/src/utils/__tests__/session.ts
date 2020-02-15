import { getAccessToken } from '../session'
import { authLogout, authLoginSuccess } from '@/actions/auth'
import { getSession, LoginSession, RefreshParams } from '@reapit/cognito-auth'

import store from '@/core/store'

jest.mock('@/actions/auth')
jest.mock('@/core/store', () => ({
  dispatch: jest.fn(),
  state: {
    auth: {},
  },
}))
jest.mock('@reapit/cognito-auth', () => ({
  getSession: jest.fn(),
}))

describe('session utils', () => {
  describe('getAccessToken', () => {
    it('should correctly return null when sessions are not available', async () => {
      store.state.auth.loginSession = null
      store.state.auth.refreshSession = null
      ;(getSession as jest.Mock).mockResolvedValueOnce(null)
      const returnValue = await getAccessToken()
      expect(getSession).toHaveBeenCalledWith(store.state.auth.loginSession, store.state.auth.refreshSession)
      expect(store.dispatch).toHaveBeenCalledWith(authLogout())
      expect(returnValue).toBeNull()
    })

    it('should correctly return value', async () => {
      store.state.auth.loginSession = {} as LoginSession
      store.state.auth.refreshSession = {} as RefreshParams
      const mockGetSessionReturnValue = { accessToken: 'accessToken' } as LoginSession
      ;(getSession as jest.Mock).mockResolvedValueOnce(mockGetSessionReturnValue)
      const returnValue = await getAccessToken()

      expect(getSession).toHaveBeenCalledWith(store.state.auth.loginSession, store.state.auth.refreshSession)
      expect(store.dispatch).toHaveBeenCalledWith(authLoginSuccess(mockGetSessionReturnValue))
      expect(returnValue).toEqual(mockGetSessionReturnValue.accessToken)
    })

    afterEach(() => {
      jest.resetAllMocks()
    })
  })
})
