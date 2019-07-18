import { Request, Response } from 'express'
import errorStrings from '../constants/error-strings'
import errorHandler from '../utils/error-handler'
import { LoginSession, getNewUser, getLoginSession } from '../utils/cognito'

export interface RefreshParams {
  userName: string
  refreshToken: string
}

export const cognitoRefreshSession = async ({
  userName,
  refreshToken
}: RefreshParams): Promise<LoginSession | undefined> => {
  return new Promise((resolve, reject) => {
    const refreshTokenObject = {
      getToken: () => refreshToken
    }
    const cognitoUser = getNewUser(userName)

    cognitoUser.refreshSession(refreshTokenObject, (err, session) => {
      if (!err && session) {
        return resolve(getLoginSession(session))
      }
      return reject(`REFRESH ERROR`)
    })
  })
}

export const refreshApi = async (req: Request, res: Response) => {
  const { userName, refreshToken } = req.body

  if (!userName || !refreshToken) {
    return errorHandler(res, 400, errorStrings.REFRESH_TOKEN_PASSWORD_REQUIRED)
  }

  try {
    const refreshResponse = await cognitoRefreshSession({ userName, refreshToken })

    if (refreshResponse) {
      res.status(200)
      res.json(refreshResponse)
      res.end()
    }
  } catch (err) {
    errorHandler(res, 400, errorStrings.REFRESH_SESSION_FAILED, err)
  }
}
