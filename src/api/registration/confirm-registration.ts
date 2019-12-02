import { Request, Response } from 'express'
import errorHandler from '../../utils/error-handler'
import errorStrings from '../../constants/error-strings'
import { confirmRegistrationService } from '../../services/registration/confirm-registration'
import { ConfirmRegistrationParams } from '../../core/types'
import successHandler from '../../utils/success-handler'

export const confirmRegistrationApi = async (req: Request, res: Response) => {
  const { verificationCode, userName } = req.body as ConfirmRegistrationParams

  if (!verificationCode || !userName) {
    return errorHandler(res, 400, errorStrings.USERNAME_CODE_REQUIRED)
  }

  try {
    const confirmRegistrationResponse = await confirmRegistrationService(req.body)
    successHandler(res, 200, req.url, { message: confirmRegistrationResponse })
  } catch (err) {
    errorHandler(res, 400, `${errorStrings.CONFIRM_REGISTRATION_FAILED}, ${err}`)
  }
}
