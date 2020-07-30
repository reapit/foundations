import { CognitoUserPool, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js'

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

export interface ConfirmRegistrationParams {
  userName: string
  verificationCode: string
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
            reject(`Bad request, change password service failed ${JSON.stringify(err)}`)
          }
          resolve(result)
        })
      },
      onFailure: err => {
        reject(`Bad request, change password service failed ${JSON.stringify(err)}`)
      },
    })
  })
}

export const confirmRegistrationService = async ({
  verificationCode,
  userName,
  cognitoClientId,
}: ConfirmRegistrationParams): Promise<string> => {
  return new Promise((resolve, reject) => {
    const cognitoUser = getNewUser(userName, cognitoClientId)

    cognitoUser.confirmRegistration(verificationCode, true, err => {
      if (err) {
        reject(`Bad request, confirm registration service failed ${JSON.stringify(err)}`)
      }
      resolve('SUCCESS')
    })
  })
}

export const confirmRegistration = async (params: ConfirmRegistrationParams): Promise<string | undefined> => {
  const { verificationCode, userName, cognitoClientId } = params
  const paramsValid = verificationCode && userName && cognitoClientId

  try {
    if (!paramsValid) {
      throw new Error('Bad request, verification code and username are required')
    }
    return await confirmRegistrationService(params)
  } catch (err) {
    console.error(`Bad request, failed to confirm registration, ${err}`)
  }
}
