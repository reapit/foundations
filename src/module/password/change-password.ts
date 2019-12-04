import errorStrings from '../../constants/error-strings'
import { changePasswordService } from '../../services/password/change-password'
import { ChangePasswordParams } from '../../core/types'

export const changePassword = async (params: ChangePasswordParams): Promise<string | undefined> => {
  const { userName, password, newPassword } = params

  try {
    if (!userName || !password || !newPassword) {
      throw new Error(errorStrings.USERNAME_PASSWORD_NEWPASSWORD_REQUIRED)
    }
    return await changePasswordService(params)
  } catch (err) {
    console.error(`${errorStrings.CHANGE_PASSWORD_FAILED}, ${err}`)
  }
}
