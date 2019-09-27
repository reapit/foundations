import { LoginSession } from '@reapit/elements'

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
    adminId: 'SOME_ADMIN_ID'
  }
} as LoginSession

export const getAccessToken = jest.fn()
