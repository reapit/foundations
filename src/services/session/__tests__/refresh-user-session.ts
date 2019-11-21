import { refreshUserSessionService } from '../refresh-user-session'
import { mockCognitoUserSession } from '../../../__mocks__/cognito'
import { getLoginSession } from '../../../utils/cognito'

jest.mock('amazon-cognito-identity-js', () => require('../../../__mocks__/cognito').mockCognito)

describe('cognitoRefreshSession', () => {
  it('should return a CognitoUserSession', async () => {
    expect(await refreshUserSessionService({ userName: 'bob@acme.com', refreshToken: 'MOCK_REFRESH_TOKEN' })).toEqual(
      getLoginSession(mockCognitoUserSession)
    )
  })
})
