import { Request, Response } from 'express'
import errorHandler from '../../utils/error-handler'
import errorStrings from '../../constants/error-strings'
import { changePasswordService } from '../../services/password/change-password'
import { ChangePasswordParams } from '../../core/types'
import successHandler from '../../utils/success-handler'

export const changePasswordApi = async (req: Request, res: Response) => {
  const { userName, password, newPassword } = req.body as ChangePasswordParams

  if (!userName || !password || !newPassword) {
    return errorHandler(res, 400, errorStrings.USERNAME_PASSWORD_NEWPASSWORD_REQUIRED)
  }

  try {
    const changePasswordResponse = await changePasswordService(req.body)
    successHandler(res, 200, req.url, { message: changePasswordResponse })
  } catch (err) {
    errorHandler(res, 400, `${errorStrings.CHANGE_PASSWORD_FAILED}, ${err}`)
  }
}
