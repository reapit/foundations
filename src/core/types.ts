export interface LoginSession {
  accessToken: string
  accessTokenExpiry: number
  idToken: string
  idTokenExpiry: number
  refreshToken: string
}

export interface LoginParams {
  userName: string
  password: string
}

export interface ChangePasswordParams {
  newPassword: string
  userName: string
  password: string
}

export interface RefreshParams {
  userName: string
  refreshToken: string
}

export interface ConfirmPasswordParams {
  userName: string
  newPassword: string
  verificationCode: string
}

export interface ConfirmRegistrationParams {
  userName: string
  verificationCode: string
}

export interface ResetPasswordParams {
  userName: string
}
