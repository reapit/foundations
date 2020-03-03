import { CognitoUserSession, AuthenticationDetails } from 'amazon-cognito-identity-js'
import { LoginSession, RefreshParams, LoginParams } from '../core/types'

export const mockCognitoUserSession = {
  getAccessToken: () =>
    ({
      getJwtToken: () => 'MOCK_ACCESS_TOKEN',
      getExpiration: () => 1,
    } as any),
  getRefreshToken: () =>
    ({
      getToken: () => 'MOCK_REFRESH_TOKEN',
    } as any),
  getIdToken: () =>
    ({
      getJwtToken: () => 'MOCK_ID_TOKEN',
      getExpiration: () => 1,
    } as any),
  isValid: () => true,
} as CognitoUserSession

export const mockLoginSession: LoginSession = {
  userName: 'bob@acme.com',
  accessTokenExpiry: 2,
  loginType: 'CLIENT',
  refreshToken: 'MOCK_REFRESH_TOKEN',
  accessToken: 'MOCK_ACCESS_TOKEN',
  idToken: 'MOCK_ID_TOKEN',
  idTokenExpiry: 2,
  mode: 'WEB',
  cognitoClientId: 'SOME_CLIENT_ID',
  loginIdentity: {
    email: 'bob@acme.com',
    developerId: 'SOME_DEV_ID',
    clientId: 'SOME_CLIENT_ID',
    adminId: 'SOME_ADMIN_ID',
    name: 'SOME_NAME',
    userCode: 'SOME_USER_CODE',
  },
}

export const mockCognito = {
  CognitoUserPool: jest.fn(),
  AuthenticationDetails: jest.fn(),
  CognitoUser: jest.fn(() => ({
    authenticateUser: (
      _authenticationDetails: AuthenticationDetails,
      callback = {
        onSuccess: (session: CognitoUserSession) => session,
        onError: (err: Error) => err,
      },
    ) => {
      callback.onSuccess(mockCognitoUserSession)
    },
    refreshSession: (_token: string, callback = (_err: Error | undefined, session: CognitoUserSession) => session) => {
      return callback(undefined, mockCognitoUserSession)
    },
    changePassword: (
      _password: string,
      _newPassword: string,
      callback = (_err: Error | undefined, result: any) => result,
    ) => {
      return callback(undefined, 'SUCCESS')
    },
    confirmPassword: (
      _verificationCode: string,
      _newPassword: string,
      callback = {
        onSuccess: () => 'SUCCESS',
        onError: (err: Error) => err,
      },
    ) => {
      callback.onSuccess()
    },
    forgotPassword: (
      callback = {
        onSuccess: (data: any) => data,
        onError: (err: Error) => err,
      },
    ) => {
      callback.onSuccess('SUCCESS')
    },
    confirmRegistration: (
      _verificationCode: string,
      _forceAliasCreation: boolean,
      callback = (_err: Error | undefined, result: any) => result,
    ) => {
      return callback(undefined, 'SUCCESS')
    },
  })),
}

export const mockRefreshParams: RefreshParams = {
  userName: 'bob@acme.com',
  loginType: 'CLIENT',
  refreshToken: 'MOCK_REFRESH_TOKEN',
  mode: 'WEB',
  cognitoClientId: 'SOME_CLIENT_ID',
  authorizationCode: null,
  redirectUri: null,
  state: null,
}

export const mockRefreshParamsCode: RefreshParams = {
  userName: 'bob@acme.com',
  loginType: 'CLIENT',
  refreshToken: null,
  mode: 'WEB',
  cognitoClientId: 'SOME_CLIENT_ID',
  authorizationCode: 'SOME_CODE',
  redirectUri: 'SOME_URI',
  state: {},
}

export const mockLoginParams: LoginParams = {
  userName: 'bob@acme.com',
  loginType: 'CLIENT',
  password: 'Password123',
  mode: 'WEB',
  cognitoClientId: 'SOME_CLIENT_ID',
}

export const refreshCognitoSession = jest.fn(() => mockLoginSession)
