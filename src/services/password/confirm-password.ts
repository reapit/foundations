import { getNewUser } from '../../utils/cognito'
import { ConfirmPasswordParams } from '../../core/types'

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
        reject(`CHANGE PASSWORD ERROR ${JSON.stringify(err.message)}`)
      }
    })
  })
}
