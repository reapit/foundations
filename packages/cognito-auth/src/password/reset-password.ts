import errorStrings from '../constants/error-strings'
import { resetPasswordService } from '../services/password/reset-password'
import { ResetPasswordParams } from '../core/types'

export const resetPassword = async (params: ResetPasswordParams): Promise<Object | undefined> => {
  const { userName, cognitoClientId } = params
  const paramsValid = cognitoClientId && userName
  try {
    if (!paramsValid) {
      throw new Error(errorStrings.USERNAME_REQUIRED)
    }
    return await resetPasswordService(params)
  } catch (err) {
    console.error(`${errorStrings.RESET_PASSWORD_FAILED}, ${err}`)
  }
}
