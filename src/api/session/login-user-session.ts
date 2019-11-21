import { Request, Response } from 'express'
import errorHandler from '../../utils/error-handler'
import errorStrings from '../../constants/error-strings'
import { loginUserSessionService } from '../../services/session/login-user-session'
import { LoginParams } from '../../core/types'
import successHandler from '../../utils/success-handler'

export const loginUserSessionApi = async (req: Request, res: Response) => {
  const { userName, password } = req.body as LoginParams

  if (!userName || !password) {
    return errorHandler(res, 400, errorStrings.USERNAME_PASSWORD_REQUIRED)
  }

  try {
    const loginResponse = await loginUserSessionService({ userName, password })
    successHandler(res, 200, req.url, loginResponse)
  } catch (err) {
    errorHandler(res, 400, `${errorStrings.AUTHENTICATION_FAILED} ${err.message}`)
  }
}
