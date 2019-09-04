import { tokenExpired, deserializeIdToken } from '../cognito'
import { mockLoginSession } from '../__mocks__/cognito'

jest.mock('jsonwebtoken', () => ({
  __esModule: true,
  default: {
    decode: () => ({
      'custom:reapit:developerId': 'SOME_DEV_ID',
      'custom:reapit:clientCode': 'SOME_CLIENT_ID',
      'custom:reapit:marketAdmin': 'SOME_ADMIN_ID',
      'custom:reapit:userCode': 'SOME_USER_CODE',
      name: 'SOME_NAME',
      email: 'SOME_EMAIL'
    })
  }
}))

describe('Cognito Utils', () => {
  describe('tokenExpired', () => {
    it('should return true if token has expired', () => {
      const expiredTwoMinsAgo = Math.round(new Date().getTime() / 1000) - 120
      expect(tokenExpired(expiredTwoMinsAgo)).toBe(true)
    })

    it('should return false if token has not expired', () => {
      const expiresInTwoMins = Math.round(new Date().getTime() / 1000) + 120
      expect(tokenExpired(expiresInTwoMins)).toBe(false)
    })
  })

  describe('deserializeIdToken', () => {
    it('should return a deserialized identity if passed a login with idToken', () => {
      expect(deserializeIdToken(mockLoginSession)).toEqual({
        developerId: 'SOME_DEV_ID',
        clientId: 'SOME_CLIENT_ID',
        adminId: 'SOME_ADMIN_ID',
        email: 'SOME_EMAIL',
        name: 'SOME_NAME',
        userCode: 'SOME_USER_CODE'
      })
    })

    it('should return a nulled identity if passed an undefined token', () => {
      expect(deserializeIdToken(undefined)).toEqual({
        developerId: null,
        clientId: null,
        adminId: null,
        email: undefined,
        name: undefined,
        userCode: null
      })
    })
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})
