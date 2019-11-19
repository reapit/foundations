import { getNewUser } from '../../utils/cognito'
import { ConfirmPasswordParams } from '../../core/types'

export const resetPasswordService = async ({ userName }: ConfirmPasswordParams): Promise<Object> => {
  return new Promise((resolve, reject) => {
    const cognitoUser = getNewUser(userName)

    cognitoUser.forgotPassword({
      onSuccess: data => {
        resolve(data)
      },
      onFailure: err => {
        reject(`CHANGE PASSWORD ERROR ${JSON.stringify(err.message)}`)
      }
    })
  })
}
