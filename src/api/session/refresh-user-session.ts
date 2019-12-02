import { Request, Response } from 'express'
import errorStrings from '../../constants/error-strings'
import errorHandler from '../../utils/error-handler'
import { refreshUserSessionService } from '../../services/session/refresh-user-session'
import { RefreshParams } from '../../core/types'
import successHandler from '../../utils/success-handler'

export const refreshUserSessionApi = async (req: Request, res: Response) => {
  const { userName, refreshToken } = req.body as RefreshParams

  if (!userName || !refreshToken) {
    return errorHandler(res, 400, errorStrings.REFRESH_TOKEN_PASSWORD_REQUIRED)
  }

  try {
    const refreshResponse = await refreshUserSessionService({ userName, refreshToken })
    successHandler(res, 200, req.url, refreshResponse)
  } catch (err) {
    errorHandler(res, 400, `${errorStrings.REFRESH_SESSION_FAILED}, ${err}`)
  }
}
