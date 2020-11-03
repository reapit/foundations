import { CognitoUserPool, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js'
import { logger } from '@reapit/utils'

export const getNewUser = (userName: string, connectClientId: string, userPoolId?: string) => {
  const poolData = {
    UserPoolId: userPoolId || window?.reapit?.config?.connectUserPoolId,
    ClientId: connectClientId,
  }
  const userPool = new CognitoUserPool(poolData)
  const userData = {
    Username: userName,
    Pool: userPool,
  }
  return new CognitoUser(userData)
}

export interface ChangePasswordParams {
  newPassword: string
  userName: string
  password: string
  connectClientId: string
}

export const changePasswordService = async ({
  password,
  userName,
  newPassword,
  connectClientId,
}: ChangePasswordParams): Promise<string> => {
  return new Promise((resolve, reject) => {
    const authenticationData = {
      Username: userName,
      Password: password,
    }
    const authenticationDetails = new AuthenticationDetails(authenticationData)
    const cognitoUser = getNewUser(userName, connectClientId)
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: () => {
        cognitoUser.changePassword(password, newPassword, (err, result) => {
          if (err) {
            logger(new Error(err.message))
            reject(err)
          }
          resolve(result)
        })
      },
      onFailure: err => {
        logger(new Error(err.message))
        reject(err)
      },
    })
  })
}
