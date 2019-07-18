import { CognitoUserPool, AuthenticationDetails, CognitoUser, CognitoUserSession } from 'amazon-cognito-identity-js'

export interface LoginSession {
  accessToken: string
  accessTokenExpiry: number
  idToken: string
  idTokenExpiry: number
  refreshToken: string
}
/**
 * Convenience method to deserialize a CognitoUser session - necessary as these getter methods are
 * not available when I have saved and retreived the session from localStorage
 */
export const getLoginSession = (session: CognitoUserSession): LoginSession => ({
  accessToken: session.getAccessToken().getJwtToken(),
  accessTokenExpiry: session.getAccessToken().getExpiration(),
  idToken: session.getIdToken().getJwtToken(),
  idTokenExpiry: session.getIdToken().getExpiration(),
  refreshToken: session.getRefreshToken().getToken()
})

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
