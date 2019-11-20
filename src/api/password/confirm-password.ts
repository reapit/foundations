import { Request, Response } from 'express'
import errorHandler from '../../utils/error-handler'
import errorStrings from '../../constants/error-strings'
import { confirmPasswordService } from '../../services/password/confirm-password'
import { ConfirmPasswordParams } from '../../core/types'
import successHandler from '../../utils/success-handler'

export const confirmPasswordApi = async (req: Request, res: Response) => {
  const { verificationCode, newPassword, userName } = req.body as ConfirmPasswordParams

  if (!verificationCode || !newPassword || !userName) {
    return errorHandler(res, 400, errorStrings.USERNAME_CODE_NEWPASSWORD_REQUIRED)
  }

  try {
    const confirmPasswordResponse = await confirmPasswordService(req.body)
    successHandler(res, 200, req.url, { message: confirmPasswordResponse })
  } catch (err) {
    errorHandler(res, 400, `${errorStrings.CONFIRM_PASSWORD_FAILED} ${err.message}`)
  }
}
