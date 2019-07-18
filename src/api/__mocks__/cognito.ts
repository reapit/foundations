import { CognitoUserSession } from 'amazon-cognito-identity-js'
import { LoginSession } from '../../utils/cognito'

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
      getJwtToken: () => 'MOCK_ID_TOKEN',
      getExpiration: () => 1
    } as any),
  isValid: () => true
} as CognitoUserSession

export const mockLoginSession = {
  accessToken: 'MOCK_ACCESS_TOKEN',
  accessTokenExpiry: 1563462727,
  idToken: 'MOCK_ID_TOKEN',
  idTokenExpiry: 1563462727,
  refreshToken: 'MOCK_REFRESH_TOKEN'
} as LoginSession
