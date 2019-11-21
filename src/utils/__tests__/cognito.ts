import { getLoginSession, getNewUser } from '../cognito'
import { mockCognitoUserSession } from '../../__mocks__/cognito'

jest.mock('amazon-cognito-identity-js', () => require('../../__mocks__/cognito').mockCognito)

describe('getLoginSession', () => {
  it('should correctly return a LoginSession', () => {
    const expected = {
      accessToken: 'MOCK_ACCESS_TOKEN',
      accessTokenExpiry: 1,
      idToken: 'MOCK_ID_TOKEN',
      idTokenExpiry: 1,
      refreshToken: 'MOCK_REFRESH_TOKEN'
    }
    expect(getLoginSession(mockCognitoUserSession)).toEqual(expected)
  })
})

describe('getNewUser', () => {
  it('should correctly return a CognitoUser instance', () => {
    const cognitoUser = getNewUser('bob@acme.com')
    expect(typeof cognitoUser.refreshSession).toEqual('function')
    expect(typeof cognitoUser.authenticateUser).toEqual('function')
  })
})
