import errorStrings from '../../constants/error-strings'
import { confirmRegistrationService } from '../../services/registration/confirm-registration'
import { ConfirmRegistrationParams } from '../../core/types'

export const confirmRegistration = async (params: ConfirmRegistrationParams): Promise<string | undefined> => {
  const { verificationCode, userName } = params

  try {
    if (!verificationCode || !userName) {
      throw new Error(errorStrings.USERNAME_CODE_REQUIRED)
    }
    return await confirmRegistrationService(params)
  } catch (err) {
    console.error(`${errorStrings.CONFIRM_REGISTRATION_FAILED}, ${err}`)
  }
}
