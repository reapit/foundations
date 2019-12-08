import { refreshUserSessionService } from '../refresh-user-session'
import { mockCognitoUserSession } from '../../../__mocks__/cognito-session'
import { getLoginSession } from '../../../utils/cognito'
import { RefreshParams } from '../../../core/types'

jest.mock('amazon-cognito-identity-js', () => require('../../../__mocks__/cognito-session').mockCognito)

describe('cognitoRefreshSession', () => {
  it('should return a CognitoUserSession', async () => {
    expect(
      await refreshUserSessionService({ userName: 'bob@acme.com', refreshToken: 'MOCK_REFRESH_TOKEN' } as RefreshParams)
    ).toEqual(getLoginSession(mockCognitoUserSession))
  })
})
