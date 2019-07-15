import { CognitoUserSession } from 'amazon-cognito-identity-js'
import { LoginSession } from '../../reducers/auth'

export const mockCognitoUserSession = {
  getAccessToken: () =>
    ({
      getJwtToken: () => 'MOCK_ACCESS_TOKEN',
      getExpiration: () => 1
    } as any),
  getRefreshToken: () =>
    ({
      getToken: () => 'MOCK_REFRESH_TOKEN'
    } as any),
  getIdToken: () =>
    ({
      getJwtToken: () => 'MOCK_ID_TOKEN'
    } as any),
  isValid: () => true
} as CognitoUserSession

export const mockLoginSession = {
  userName: 'bob@acme.com',
  loginType: 'CLIENT',
  refreshToken: 'MOCK_REFRESH_TOKEN',
  accessToken: 'MOCK_ACCESS_TOKEN',
  sessionExpiry: 1
} as LoginSession

export const cognitoLogin = jest.fn()
