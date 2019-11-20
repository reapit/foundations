import { loginUserSessionService } from '../login-user-session'
import { mockCognitoUserSession } from '../../../__mocks__/cognito'
import { getLoginSession } from '../../../utils/cognito'

jest.mock('amazon-cognito-identity-js', () => require('../../../__mocks__/cognito').mockCognito)

describe('loginUserSessionService', () => {
  it('should return a CognitoUserSession', async () => {
    expect(await loginUserSessionService({ userName: 'bob@acme.com', password: 'xxxx' })).toEqual(
      getLoginSession(mockCognitoUserSession)
    )
  })
})
