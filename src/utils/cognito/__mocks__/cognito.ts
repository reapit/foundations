import { LoginSession } from '../types'

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
    name: 'SOME_NAME',
    userCode: 'SOME_USER_CODE'
  }
} as LoginSession

export const cognitoLogin = jest.fn()
export const deserializeIdToken = jest.fn(() => mockLoginSession.loginIdentity)
export const getAccessToken = jest.fn()
