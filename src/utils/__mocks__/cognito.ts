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

export const cognitoLogin = jest.fn()
export const deserializeIdToken = jest.fn(() => mockLoginSession.loginIdentity)
export const getAccessToken = jest.fn()
export const fetcher = jest.fn()
export const COGNITO_API_BASE_URL = 'https://1wke0xp728.execute-api.eu-west-2.amazonaws.com/dev/api'
export const COGNITO_HEADERS = {
  'Content-Type': 'application/json'
}
