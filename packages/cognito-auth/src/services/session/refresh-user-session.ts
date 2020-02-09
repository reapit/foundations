import { LoginSession, LoginType } from '../../core/types'
import { getNewUser, getLoginSession } from '../../utils/cognito'
import errorStrings from '../../constants/error-strings'
import { fetcher } from '@reapit/elements'

const TIME_NOW = Math.round(new Date().getTime() / 1000)
const ONE_MINUTE_SECS = 60

export const tokenRefreshUserSessionService = async (
  userName: string,
  refreshToken: string,
  congitoClientId: string,
): Promise<Partial<LoginSession>> => {
  return new Promise((resolve, reject) => {
    const refreshTokenObject = {
      getToken: () => refreshToken,
    }
    const cognitoUser = getNewUser(userName, congitoClientId)

    cognitoUser.refreshSession(refreshTokenObject, (err, session) => {
      if (!err && session) {
        return resolve(getLoginSession(session))
      }
      return reject(`${errorStrings.TOKEN_REFRESH_SESSION_SERVICE_ERROR} ${JSON.stringify(err)}`)
    })
  })
}

export const codeRefreshUserSessionService = async (
  authorizationCode: string,
  redirectUri: string,
  congitoClientId: string,
  loginType: LoginType = 'CLIENT',
): Promise<Partial<LoginSession>> => {
  const session = await fetcher({
    method: 'POST',
    api: process.env.COGNITO_OAUTH_URL as string,
    url:
      `/token?grant_type=authorization_code&client_id=${congitoClientId}` +
      `&code=${authorizationCode}&redirect_uri=${redirectUri}&state=${loginType}`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })

  if (session) {
    const { expires_in, access_token, refresh_token, id_token } = session
    // Expire time from API, less a minute to allow for latency
    const tokenExpiry = TIME_NOW + expires_in - ONE_MINUTE_SECS
    return {
      accessToken: access_token,
      accessTokenExpiry: tokenExpiry,
      idToken: id_token,
      idTokenExpiry: tokenExpiry,
      refreshToken: refresh_token,
    }
  }

  throw new Error(`${errorStrings.CODE_REFRESH_SESSION_SERVICE_ERROR}`)
}
