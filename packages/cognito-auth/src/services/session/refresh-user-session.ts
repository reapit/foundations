import { LoginSession, RefreshParams } from '../../core/types'
import { getNewUser, getLoginSession } from '../../utils/cognito'
import errorStrings from '../../constants/error-strings'

export const refreshUserSessionService = async ({
  userName,
  refreshToken
}: RefreshParams): Promise<Partial<LoginSession>> => {
  return new Promise((resolve, reject) => {
    const refreshTokenObject = {
      getToken: () => refreshToken
    }
    const cognitoUser = getNewUser(userName)

    cognitoUser.refreshSession(refreshTokenObject, (err, session) => {
      if (!err && session) {
        return resolve(getLoginSession(session))
      }
      return reject(`${errorStrings.REFRESH_SESSION_SERVICE_ERROR} ${JSON.stringify(err)}`)
    })
  })
}
