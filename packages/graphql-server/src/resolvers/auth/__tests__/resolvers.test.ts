import { login } from '../resolvers'
import { LoginParams } from '@reapit/cognito-auth'
import { mockContext } from '../../../__mocks__/context'

jest.mock('../services', () => ({
  login: jest.fn(() => ({
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
  })),
}))

describe('auth resolvers', () => {
  describe('login', () => {
    it('should run correctly', () => {
      const mockArgs = {
        userName: 'mockUserName',
        password: 'mockPassword',
        loginType: 'DEVELOPER',
        mode: 'DESKTOP',
      } as LoginParams
      const output = {
        accessToken: 'accessToken',
        refreshToken: 'refreshToken',
      }
      const result = login({}, mockArgs, mockContext)
      expect(result).toEqual(output)
    })
  })
})
