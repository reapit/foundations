import { DEFAULT_HEADERS, PACKAGE_SUFFIXES } from './constants'
import { Request } from 'express'
import { loginUserSessionService } from '../../../../cognito-auth/src/services/session/login-user-session'
import { LoginParams } from '../../../../cognito-auth/src/core/types'

export const getServerHeaders = async (req: Request, packageSuffix: PACKAGE_SUFFIXES) => {
  const authHeaders =
    process.env.REAPIT_ENV === 'LOCAL'
      ? {
          Authorization: `${await loginUserSessionService({
            userName: process.env.DEVELOPER_ACCOUNT_EMAIL,
            password: process.env.DEVELOPER_ACCOUNT_PASSWORD,
            cognitoClientId: `process.env.COGNITO_CLIENT_ID_${packageSuffix}`,
          } as LoginParams)}`,
        }
      : req.headers
  return {
    ...DEFAULT_HEADERS,
    ...authHeaders,
  }
}
