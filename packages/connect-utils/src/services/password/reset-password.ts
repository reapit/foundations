import { getNewUser } from '../../utils/cognito'
import { ResetPasswordParams } from '../../core/types'
import errorStrings from '../../constants/error-strings'

export const resetPasswordService = async ({ userName, cognitoClientId }: ResetPasswordParams): Promise<Object> => {
  return new Promise((resolve, reject) => {
    const cognitoUser = getNewUser(userName, cognitoClientId)

    cognitoUser.forgotPassword({
      onSuccess: data => {
        resolve(data)
      },
      onFailure: err => {
        reject(`${errorStrings.RESET_PASSWORD_SERVICE_ERROR} ${JSON.stringify(err)}`)
      },
    })
  })
}
