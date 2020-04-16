export type LoginMode = 'DESKTOP' | 'WEB'

export type LoginType = 'DEVELOPER' | 'CLIENT' | 'ADMIN'

export interface LoginParams {
  userName: string
  password: string
  loginType: LoginType
  mode: LoginMode
  cognitoClientId: string
  userPoolId?: string
}

export interface RefreshParams {
  cognitoClientId: string
  loginType: LoginType
  mode: LoginMode
  redirectUri: string | null
  authorizationCode: string | null
  refreshToken: string | null
  userName: string | null
  state: Object | null
}

export interface CoginitoIdentity {
  sub: string
  email_verified: boolean
  iss: string
  phone_number_verified: boolean
  'cognito:username': string
  'custom:reapit:developerId'?: string
  'custom:reapit:clientCode'?: string
  'custom:reapit:marketAdmin'?: string
  'custom:reapit:userCode'?: string
  aud: string
  token_use: string
  auth_time: number
  name: string
  phone_number: string
  exp: number
  iat: number
  email: string
}

export interface LoginIdentity {
  email: string
  name: string
  developerId: string | null
  clientId: string | null
  adminId: string | null
  userCode: string | null
}

export interface LoginSession {
  userName: string
  accessToken: string
  accessTokenExpiry: number
  idToken: string
  idTokenExpiry: number
  refreshToken: string
  loginType: LoginType
  loginIdentity: LoginIdentity
  mode: LoginMode
  cognitoClientId: string
}

export interface ChangePasswordParams {
  newPassword: string
  userName: string
  password: string
  cognitoClientId: string
}

export interface ConfirmPasswordParams {
  userName: string
  newPassword: string
  verificationCode: string
  cognitoClientId: string
}

export interface ConfirmRegistrationParams {
  userName: string
  verificationCode: string
  cognitoClientId: string
}

export interface ResetPasswordParams {
  userName: string
  cognitoClientId: string
}
