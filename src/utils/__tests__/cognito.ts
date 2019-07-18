import { getLoginSession, getNewUser } from '../cognito'
import { mockCognitoUserSession } from '../../api/__mocks__/cognito'
import { CognitoUserSession, AuthenticationDetails } from 'amazon-cognito-identity-js'

jest.mock('amazon-cognito-identity-js', () => ({
  CognitoUserPool: jest.fn(),
  CognitoUser: jest.fn(() => ({
    refreshSession: jest.fn(),
    authenticateUser: jest.fn()
  }))
}))

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
