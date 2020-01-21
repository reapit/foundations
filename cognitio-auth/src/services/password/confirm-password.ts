import { getNewUser } from '../../utils/cognito'
import { ConfirmPasswordParams } from '../../core/types'
import errorStrings from '../../constants/error-strings'

export const confirmPasswordService = async ({
  verificationCode,
  userName,
  newPassword
}: ConfirmPasswordParams): Promise<string> => {
  return new Promise((resolve, reject) => {
    const cognitoUser = getNewUser(userName)

    cognitoUser.confirmPassword(verificationCode, newPassword, {
      onSuccess: () => {
        resolve('SUCCESS')
      },
      onFailure: err => {
        reject(`${errorStrings.CONFIRM_PASSWORD_SERVICE_ERROR} ${JSON.stringify(err)}`)
      }
    })
  })
}
