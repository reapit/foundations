// import { CognitoUserPool, CognitoUser } from 'amazon-cognito-identity-js'
import jwt from 'jsonwebtoken'
import { LoginIdentity, CoginitoIdentity, CoginitoAccess, LoginAccess } from './types'

export const TOKEN_EXPIRY = Math.round(new Date().getTime() / 1000) + 300 // 5 minutes from now
// export const getNewUser = (userName: string, cognitoClientId: string, userPoolId?: string) => {
//   const poolData = {
//     UserPoolId: userPoolId || window?.reapit?.config?.cognitoUserPoolId,
//     ClientId: cognitoClientId,
//   }
//   const userPool = new CognitoUserPool(poolData)
//   const userData = {
//     Username: userName,
//     Pool: userPool,
//   }
//   return new CognitoUser(userData)
// }

/**
 * Used to verify if an access token has expired by checking time now against token expiry
 */
export const accessTokenExpired = (accessToken: string) => {
  const expiry = deserializeAccessToken(accessToken).expiry
  return expiry < TOKEN_EXPIRY
}

export const deserializeIdToken = (idToken: string): LoginIdentity => {
  const decoded = jwt.decode(idToken) as CoginitoIdentity

  return {
    name: decoded['name'],
    email: decoded['email'],
    developerId: decoded['custom:reapit:developerId'] || null,
    clientId: decoded['custom:reapit:clientCode'] || null,
    adminId: decoded['custom:reapit:marketAdmin'] || null,
    userCode: decoded['custom:reapit:userCode'] || null,
    groups: decoded['cognito:groups'] || [],
  }
}

export const deserializeAccessToken = (accessToken: string): LoginAccess => {
  const decoded = jwt.decode(accessToken) as CoginitoAccess

  return {
    expiry: decoded['exp'],
  }
}
