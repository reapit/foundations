import { LoginSession } from '../../reducers/auth'

export const mockLoginSession = {
  userName: 'bob@acme.com',
  accessTokenExpiry: 2,
  loginType: 'CLIENT',
  refreshToken: 'MOCK_REFRESH_TOKEN',
  accessToken: 'MOCK_ACCESS_TOKEN'
} as LoginSession

export const cognitoLogin = jest.fn()
