import { tokenRefreshUserSessionService, codeRefreshUserSessionService } from './refresh-user-session'
import { mockCognitoUserSession } from '../../__mocks__/cognito-session'
import { getLoginSession } from '../../utils/cognito'

jest.mock('amazon-cognito-identity-js', () => require('../../__mocks__/cognito-session').mockCognito)
jest.mock('@reapit/elements', () => ({
  fetcher: () => ({
    expires_in: 3600,
    access_token: 'SOME_TOKEN',
    refresh_token: 'SOME_TOKEN',
    id_token: 'SOME_TOKEN',
  }),
}))

describe('tokenRefreshUserSessionService', () => {
  it('should return a LoginSession', async () => {
    expect(await tokenRefreshUserSessionService('bob@acme.com', 'MOCK_REFRESH_TOKEN', 'someCognitoClientId')).toEqual({
      ...getLoginSession(mockCognitoUserSession),
      cognitoClientId: 'someCognitoClientId',
    })
  })
})

describe('codeRefreshUserSessionService', () => {
  it('should return a LoginSession', async () => {
    expect(await codeRefreshUserSessionService('authCode', 'redirectUri', 'someCognitoClientId', 'DEVELOPER')).toEqual({
      accessToken: 'SOME_TOKEN',
      accessTokenExpiry: 1570750731,
      idToken: 'SOME_TOKEN',
      idTokenExpiry: 1570750731,
      refreshToken: 'SOME_TOKEN',
      cognitoClientId: 'someCognitoClientId',
      loginType: 'DEVELOPER',
    })
  })
})
