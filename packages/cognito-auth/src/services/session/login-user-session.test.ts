import { loginUserSessionService } from './login-user-session'
import { mockCognitoUserSession } from '../../__mocks__/cognito-session'
import { getLoginSession } from '../../utils/cognito'
import { LoginParams } from '../../core/types'

jest.mock('amazon-cognito-identity-js', () => require('../../__mocks__/cognito-session').mockCognito)

describe('loginUserSessionService', () => {
  it('should return a CognitoUserSession', async () => {
    expect(await loginUserSessionService({ userName: 'bob@acme.com', password: 'xxxx' } as LoginParams)).toEqual(
      getLoginSession(mockCognitoUserSession),
    )
  })
})
