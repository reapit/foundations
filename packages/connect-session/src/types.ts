export interface ReapitConnectBrowserSessionInitializers {
  connectOAuthUrl: string
  connectClientId: string
  connectLoginRedirectPath?: string
  connectLogoutRedirectPath?: string
}

export interface ReapitConnectSession {
  accessToken: string
  refreshToken: string
  idToken: string
  loginIdentity: LoginIdentity
}

export interface LoginIdentity {
  email: string
  name: string
  developerId: string | null
  clientId: string | null
  adminId: string | null
  userCode: string | null
  groups: string[]
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
  'cognito:groups'?: string[]
}

export interface CoginitoAccess {
  sub: string
  'cognito:groups': string[]
  token_use: string
  scope: string
  auth_time: number
  iss: string
  exp: number
  iat: number
  version: number
  jti: string
  client_id: string
  username: string
}

export type ReapitConnectHook = {
  connectSession: ReapitConnectSession | null
  connectAuthorizeRedirect: (redirectUri?: string) => void
  connectLoginRedirect: (redirectUri?: string) => void
  connectLogoutRedirect: (redirectUri?: string) => void
  connectIsDesktop: boolean
}
