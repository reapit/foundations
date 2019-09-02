export type LoginType = 'DEVELOPER' | 'CLIENT' | 'ADMIN'

export interface LoginParams {
  userName: string
  password: string
  loginType: LoginType
}

export interface RefreshParams {
  userName: string
  refreshToken: string
  loginType: LoginType
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
}
