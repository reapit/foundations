import { Request, Response } from 'express';
import { LoginParams, LoginSession, getNewUser, getLoginSession } from '../utils/cognito'
import { AuthenticationDetails } from 'amazon-cognito-identity-js';
import errorHandler from '../utils/error-handler'
import errorStrings from '../constants/error-strings';

export const cognitoLogin = async ({
  userName,
  password
}: LoginParams): Promise<LoginSession | undefined> => {
  return new Promise((resolve, reject) => {
    const authenticationData = {
      Username: userName,
      Password: password
    }
    const authenticationDetails = new AuthenticationDetails(authenticationData)
    const cognitoUser = getNewUser(userName)
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: session => {
        resolve(getLoginSession(session, userName))
      },
      onFailure: err => {
        reject(`LOGIN ERROR ${err}`)
      }
    })
  })
}

export const loginApi = async (req: Request, res: Response) => {

  const { userName, password } = req.body

  if (!userName || !password) {
    return errorHandler(res, 400, errorStrings.USERNAME_PASSWORD_REQUIRED)
  }

  try {
    const loginResponse = await cognitoLogin({userName, password})

    if (loginResponse) {
      res.json(loginResponse)
      res.end()
    }
  } catch (err) {
    errorHandler(res, 400, errorStrings.AUTHENTICATION_FAILED)
  }
}