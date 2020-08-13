import { CognitoUserPool, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js'
import { logger } from '@reapit/utils'

export const getNewUser = (userName: string, cognitoClientId: string, userPoolId?: string) => {
  const poolData = {
    UserPoolId: userPoolId || window?.reapit?.config?.cognitoUserPoolId,
    ClientId: cognitoClientId,
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
  cognitoClientId: string
}

export const changePasswordService = async ({
  password,
  userName,
  newPassword,
  cognitoClientId,
}: ChangePasswordParams): Promise<string> => {
  return new Promise((resolve, reject) => {
    const authenticationData = {
      Username: userName,
      Password: password,
    }
    const authenticationDetails = new AuthenticationDetails(authenticationData)
    const cognitoUser = getNewUser(userName, cognitoClientId)
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
