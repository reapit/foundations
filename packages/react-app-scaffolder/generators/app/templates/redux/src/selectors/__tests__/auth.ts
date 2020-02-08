import { selectUserCode, selectUserLoginStatus, checkIsDesktopMode, checkIsWebMode } from '../auth'
import { ReduxState } from '../../types/core'

const state: ReduxState = {
  auth: {
    error: false,
    loginSession: {
      userName: '',
      loginIdentity: {
        userCode: '',
        email: '',
        name: '',
        developerId: null,
        clientId: null,
        adminId: null,
      },
      accessToken: '',
      accessTokenExpiry: 3000,
      idToken: '',
      idTokenExpiry: 3000,
      refreshToken: '',
      loginType: 'CLIENT',
      mode: 'WEB',
    },
    refreshSession: {
      refreshToken: '',
      userName: '',
      loginType: 'CLIENT',
      mode: 'WEB',
    },
  },
  error: { componentError: null, serverError: null },
  home: { loading: false, homeData: null },
}

describe('auth selectors', () => {
  it('should select correct values', () => {
    expect(selectUserCode(state)).toEqual('')
    expect(selectUserLoginStatus(state)).toEqual(true)
    expect(checkIsDesktopMode(state)).toEqual(false)
    expect(checkIsWebMode(state)).toEqual(true)
  })
})
