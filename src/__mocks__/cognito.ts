import { CognitoUserSession, AuthenticationDetails } from 'amazon-cognito-identity-js'
import { LoginSession } from '../core/types'

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

export const mockCognito = {
  CognitoUserPool: jest.fn(),
  AuthenticationDetails: jest.fn(),
  CognitoUser: jest.fn(() => ({
    authenticateUser: (
      _authenticationDetails: AuthenticationDetails,
      callback = {
        onSuccess: (session: CognitoUserSession) => session,
        onError: (err: Error) => err
      }
    ) => {
      callback.onSuccess(mockCognitoUserSession)
    },
    refreshSession: (_token: string, callback = (_err: Error | undefined, session: CognitoUserSession) => session) => {
      return callback(undefined, mockCognitoUserSession)
    },
    changePassword: (
      _password: string,
      _newPassword: string,
      callback = (_err: Error | undefined, result: any) => result
    ) => {
      return callback(undefined, 'SUCCESS')
    },
    confirmPassword: (
      _verificationCode: string,
      _newPassword: string,
      callback = {
        onSuccess: () => 'SUCCESS',
        onError: (err: Error) => err
      }
    ) => {
      callback.onSuccess()
    },
    forgotPassword: (
      callback = {
        onSuccess: (data: any) => data,
        onError: (err: Error) => err
      }
    ) => {
      callback.onSuccess('SUCCESS')
    },
    confirmRegistration: (
      _verificationCode: string,
      _forceAliasCreation: boolean,
      callback = (_err: Error | undefined, result: any) => result
    ) => {
      return callback(undefined, 'SUCCESS')
    }
  }))
}
