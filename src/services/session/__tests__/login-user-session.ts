import { AuthenticationDetails, CognitoUserSession } from 'amazon-cognito-identity-js'
import { loginUserSessionService } from '../login-user-session'
import { mockCognitoUserSession } from '../../../__mocks__/cognito'
import { getLoginSession } from '../../../utils/cognito'

jest.mock('amazon-cognito-identity-js', () => ({
  CognitoUserPool: jest.fn(),
  AuthenticationDetails: jest.fn(),
  CognitoUser: jest.fn(() => ({
    authenticateUser: (
      _authenticationDetails: AuthenticationDetails,
      callback = {
        onSuccess: (session: CognitoUserSession) => session,
        onError: (err: Error) => err
      }
    ) => {
      callback.onSuccess(mockCognitoUserSession)
    }
  }))
}))

describe('loginUserSessionService', () => {
  it('should return a CognitoUserSession', async () => {
    expect(await loginUserSessionService({ userName: 'bob@acme.com', password: 'xxxx' })).toEqual(
      getLoginSession(mockCognitoUserSession)
    )
  })
})
