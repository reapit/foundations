import { LoginSession, RefreshParams } from '../../core/types'
import { getNewUser, getLoginSession } from '../../utils/cognito'

export const refreshUserSessionService = async ({ userName, refreshToken }: RefreshParams): Promise<LoginSession> => {
  return new Promise((resolve, reject) => {
    const refreshTokenObject = {
      getToken: () => refreshToken
    }
    const cognitoUser = getNewUser(userName)

    cognitoUser.refreshSession(refreshTokenObject, (err, session) => {
      if (!err && session) {
        return resolve(getLoginSession(session))
      }
      return reject(`REFRESH ERROR ${JSON.stringify(err.message)}`)
    })
  })
}
