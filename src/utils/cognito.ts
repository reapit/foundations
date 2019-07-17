import { CognitoUserPool, AuthenticationDetails, CognitoUser, CognitoUserSession } from 'amazon-cognito-identity-js'
// import store from '../core/store'
// import { authLoginSuccess, authLogout } from '../actions/auth'
// import { LoginSession, LoginType } from '../reducers/auth'


export type LoginType = 'DEVELOPER' | 'CLIENT' | 'ADMIN'

export interface LoginSession {
  // userName: string
  // loginType: LoginType
  refreshToken: string
  accessToken: string
  sessionExpiry: number
}

// export interface RefreshSession {
//   // userName: string
//   // loginType: LoginType
//   refreshToken: string
//   accessToken: string
//   sessionExpiry: number
// }

export interface LoginParams {
  userName: string
  password: string
  // loginType: LoginType
}

export interface RefreshParams {
  userName: string
  refreshToken: string
  // loginType: LoginType
}

/**
 * Used to verify if an access token has expired by checking time now against token expiry
 */
export const tokenExpired = (expiry: number) => {
  // Adding a minute to avoid race conditions on the API and CPU clock innaccuracies
  const timeNowPlusMin = Math.round(new Date().getTime() / 1000) + 60
  return expiry < timeNowPlusMin
}

/**
 * Convenience method to log the user out when Cognito fails and ensure LoginSession is restored to
 * null in Redux
 */
export const logOutUser = (loginType: LoginType) => {
  // store.dispatch(authLogout(loginType))
  return null
}

/**
 * Convenience method to deserialize a CognitoUser session - necessary as these getter methods are
 * not available when I have saved and retreived the session from localStorage
 */
export const getLoginSession = (session: CognitoUserSession, userName: string): LoginSession => ({
  accessToken: session.getAccessToken().getJwtToken(),
  refreshToken: session.getRefreshToken().getToken(),
  sessionExpiry: session.getAccessToken().getExpiration(),
  // userName,
  // loginType
})
/**
 * Calls out to the cognitoRefreshSession method - if I get a refreshed session
 * set this to redux and return token. If not, log me out as refresh token has expired
 */
export const getRefreshedSession = async (refreshSession: RefreshParams): Promise<LoginSession | null> => {
  const newSession = await cognitoRefreshSession(refreshSession)
  if (newSession) {
    // store.dispatch(authLoginSuccess(newSession))
    return newSession
  }
  return null
  // return logOutUser(loginSession.loginType)
}

/**
 * Handles business logic to return an access token
 * If I don't have a session in Redux, logout
 * If I do have one in Redux and not expired, return that session
 * If not, refresh session
 * If that fails, logout
 */
// export const getAccessToken = async (): Promise<string | null> => {
//   // const { loginSession, loginType } = store.state.auth

//   if (!loginSession) {
//     return logOutUser(loginType)
//   }

//   const sessionExpired = tokenExpired(loginSession.sessionExpiry)

//   if (!sessionExpired) {
//     return loginSession.accessToken
//   }

//   const refreshedSession = await getRefreshedSession(loginSession)

//   if (refreshedSession) {
//     return refreshedSession.accessToken
//   }

//   return logOutUser(loginType)
// }

export const getNewUser = (userName: string) => {
  const poolData = {
    UserPoolId: process.env.COGNITO_USERPOOL_ID as string,
    ClientId: process.env.COGNITO_CLIENT_ID as string
  }
  const userPool = new CognitoUserPool(poolData)
  const userData = {
    Username: userName,
    Pool: userPool
  }
  return new CognitoUser(userData)
}

export const cognitoLogin = async ({
  userName,
  password,
  // loginType
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
        reject(`LOGIN ERROR ${err.message}`)
      }
    })
  })
}

export const cognitoRefreshSession = async ({
  userName,
  refreshToken,
  // loginType = 'CLIENT'
}: RefreshParams): Promise<LoginSession | undefined> => {
  return new Promise((resolve, reject) => {
    const refreshTokenObject = {
      getToken: () => refreshToken
    }
    const cognitoUser = getNewUser(userName)

    cognitoUser.refreshSession(refreshTokenObject, (err, session) => {
      if (!err && session) {
        return resolve(getLoginSession(session, userName))
      }
      return reject(`REFRESH ERROR`)
    })
  })
}
