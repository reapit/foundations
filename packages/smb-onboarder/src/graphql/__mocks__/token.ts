import { LoginParams } from '@reapit/cognito-auth'

export const token = {
  __typename: 'Token',
  accessToken: 'mockAccessToken',
  refreshToken: 'mockRefreshToken',
}

/*
 * TODOME(cognito)
 * remove
 */

export const loginParams = {
  userName: 'mockUsername',
  password: 'mockPassword',
  loginType: 'CLIENT',
  mode: 'WEB',
} as LoginParams
