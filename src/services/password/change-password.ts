import { getNewUser } from '../../utils/cognito'
import { ChangePasswordParams } from '../../core/types'
import { AuthenticationDetails } from 'amazon-cognito-identity-js'

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
            reject(`CHANGE PASSWORD ERROR ${JSON.stringify(err.message)}`)
          }
          resolve(result)
        })
      },
      onFailure: err => {
        reject(`CHANGE PASSWORD ERROR ${JSON.stringify(err.message)}`)
      }
    })
  })
}
