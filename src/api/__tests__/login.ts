import { AuthenticationDetails, CognitoUserSession } from 'amazon-cognito-identity-js'
import { mockCognitoUserSession } from '../__mocks__/cognito'
import { getLoginSession } from '../../utils/cognito'
import { cognitoLogin } from '../login'

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

describe('cognitoLogin', () => {
  it('should return a CognitoUserSession', async () => {
    expect(await cognitoLogin({ userName: 'bob@acme.com', password: 'xxxx' })).toEqual(
      getLoginSession(mockCognitoUserSession)
    )
  })
})
