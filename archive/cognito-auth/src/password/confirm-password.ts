import errorStrings from '../constants/error-strings'
import { confirmPasswordService } from '../services/password/confirm-password'
import { ConfirmPasswordParams } from '../core/types'

export const confirmPassword = async (params: ConfirmPasswordParams): Promise<string | undefined> => {
  const { verificationCode, newPassword, userName, cognitoClientId } = params
  const paramsValid = verificationCode && newPassword && userName && cognitoClientId
  try {
    if (!paramsValid) {
      throw new Error(errorStrings.USERNAME_CODE_NEWPASSWORD_REQUIRED)
    }

    return await confirmPasswordService(params)
  } catch (err) {
    console.error(`${errorStrings.CONFIRM_PASSWORD_FAILED}, ${err}`)
  }
}
