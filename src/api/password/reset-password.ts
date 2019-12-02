import { Request, Response } from 'express'
import errorHandler from '../../utils/error-handler'
import errorStrings from '../../constants/error-strings'
import { resetPasswordService } from '../../services/password/reset-password'
import { ResetPasswordParams } from '../../core/types'
import successHandler from '../../utils/success-handler'

export const resetPasswordApi = async (req: Request, res: Response) => {
  const { userName } = req.body as ResetPasswordParams

  if (!userName) {
    return errorHandler(res, 400, errorStrings.USERNAME_REQUIRED)
  }

  try {
    const resetPasswordResponse = await resetPasswordService(req.body)
    successHandler(res, 200, req.url, resetPasswordResponse)
  } catch (err) {
    errorHandler(res, 400, `${errorStrings.RESET_PASSWORD_FAILED}, ${err}`)
  }
}
