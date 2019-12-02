import { getNewUser } from '../../utils/cognito'
import { ChangePasswordParams } from '../../core/types'
import { AuthenticationDetails } from 'amazon-cognito-identity-js'
import errorStrings from '../../constants/error-strings'

export const changePasswordService = async ({
  password,
  userName,
  newPassword
}: ChangePasswordParams): Promise<string> => {
  return new Promise((resolve, reject) => {
    const authenticationData = {
      Username: userName,
      Password: password
    }
    const authenticationDetails = new AuthenticationDetails(authenticationData)
    const cognitoUser = getNewUser(userName)
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: () => {
        cognitoUser.changePassword(password, newPassword, (err, result) => {
          if (err) {
            reject(`${errorStrings.CHANGE_PASSWORD_SERVICE_ERROR} ${JSON.stringify(err)}`)
          }
          resolve(result)
        })
      },
      onFailure: err => {
        reject(`${errorStrings.CHANGE_PASSWORD_SERVICE_ERROR} ${JSON.stringify(err)}`)
      }
    })
  })
}
