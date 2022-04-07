import { CognitoUserPool, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js'
import { logger } from '@reapit/utils-react'

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
}

export interface ConfirmRegistrationParams {
  userName: string
  verificationCode: string
  connectClientId: string
}

export const changePasswordService = async ({
  password,
  userName,
  newPassword,
}: ChangePasswordParams): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const authenticationData = {
      Username: userName,
      Password: password,
    }
    const authenticationDetails = new AuthenticationDetails(authenticationData)
    const cognitoUser = getNewUser(userName, window.reapit.config.connectClientId)
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: () => {
        cognitoUser.changePassword(password, newPassword, (err) => {
          if (err) {
            logger(new Error(err.message))
            reject(err)
          }
          resolve(true)
        })
      },
      onFailure: (err) => {
        logger(new Error(err.message))
        resolve(false)
      },
    })
  })
}

export const confirmRegistrationService = async ({
  verificationCode,
  userName,
  connectClientId,
}: ConfirmRegistrationParams): Promise<string> => {
  return new Promise((resolve, reject) => {
    const cognitoUser = getNewUser(userName, connectClientId)

    cognitoUser.confirmRegistration(verificationCode, true, (err) => {
      if (err) {
        logger(new Error(err.message))
        reject(`Bad request, confirm registration service failed ${JSON.stringify(err)}`)
      }
      resolve('SUCCESS')
    })
  })
}

export const confirmRegistration = async (params: ConfirmRegistrationParams): Promise<string | undefined> => {
  const { verificationCode, userName, connectClientId } = params
  const paramsValid = verificationCode && userName && connectClientId

  try {
    if (!paramsValid) {
      throw new Error('Bad request, verification code and username are required')
    }
    return await confirmRegistrationService(params)
  } catch (err) {
    logger(err as Error)
    console.error(`Bad request, failed to confirm registration, ${err}`)
  }
}
