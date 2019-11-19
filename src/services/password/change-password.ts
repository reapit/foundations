import { getNewUser } from '../../utils/cognito'
import { ChangePasswordParams } from '../../core/types'

export const changePasswordService = async ({
  password,
  userName,
  newPassword
}: ChangePasswordParams): Promise<string> => {
  return new Promise((resolve, reject) => {
    const cognitoUser = getNewUser(userName)

    cognitoUser.changePassword(password, newPassword, (err, result) => {
      if (err || !result) {
        reject(`CHANGE PASSWORD ERROR ${JSON.stringify(err)}`)
      }
      resolve(result)
    })
  })
}
