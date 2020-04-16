import errorStrings from '../constants/error-strings'
import { loginUserSessionService } from '../services/session/login-user-session'
import { LoginParams, LoginSession } from '../core/types'
import { deserializeIdToken, checkHasIdentityId, setSessionCookie } from '../utils/cognito'

export const loginUserSession = async (params: LoginParams): Promise<Partial<LoginSession> | undefined> => {
  const { userName, password, cognitoClientId } = params
  const paramsValid = userName && password && cognitoClientId
  try {
    if (!paramsValid) {
      throw new Error(errorStrings.USERNAME_PASSWORD_REQUIRED)
    }
    const session = await loginUserSessionService(params)
    return session
  } catch (err) {
    console.error(`${errorStrings.AUTHENTICATION_FAILED}, ${err}`)
  }
}

export const setUserSession = async (params: LoginParams, identifier?: string): Promise<LoginSession | null> => {
  const { userName, loginType, mode } = params

  const loginDetails: Partial<LoginSession> | undefined = await loginUserSession(params)
  const loginIdentity = loginDetails && deserializeIdToken(loginDetails)
  if (loginIdentity && checkHasIdentityId(loginType, loginIdentity)) {
    const loginSession = { ...loginDetails, loginType, mode, userName, loginIdentity } as LoginSession

    setSessionCookie(loginSession, identifier)

    return loginSession
  }
  return null
}
