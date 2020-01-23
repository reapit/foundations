import { login } from '../services'
import { LoginParams } from '@reapit/cognito-auth'
import { mockContext } from '../../../__mocks__/context'

jest.mock('../api', () => ({
  callLoginAPI: jest.fn(() => ({
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
  })),
}))

describe('auth services', () => {
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
      const result = login(mockArgs, mockContext)
      expect(result).toEqual(output)
    })
  })
})
