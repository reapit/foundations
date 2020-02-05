import { LoginParams, LoginSession } from '../../core/types'
import { AuthenticationDetails } from 'amazon-cognito-identity-js'
import { getNewUser, getLoginSession } from '../../utils/cognito'
import errorStrings from '../../constants/error-strings'

export const loginUserSessionService = async ({
  userName,
  password,
  cognitoClientId,
}: LoginParams): Promise<Partial<LoginSession>> => {
  return new Promise((resolve, reject) => {
    const authenticationData = {
      Username: userName,
      Password: password,
    }
    const authenticationDetails = new AuthenticationDetails(authenticationData)
    const cognitoUser = getNewUser(userName, cognitoClientId)
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: session => {
        resolve(getLoginSession(session))
      },
      onFailure: err => {
        reject(`${errorStrings.LOGIN_SESSION_SERVICE_ERROR} ${JSON.stringify(err)}`)
      },
    })
  })
}
