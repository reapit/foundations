import { loginUserSession, setUserSession } from './login-user-session'
import { loginUserSessionService } from '../services/session/login-user-session'
import errorStrings from '../constants/error-strings'
import { LoginParams } from '../core/types'
import { mockLoginSession, mockLoginParams } from '../__mocks__/cognito-session'

jest.mock('../services/session/login-user-session')
jest.mock('../utils/cognito')

const mockedSessionService = loginUserSessionService as jest.Mock

describe('user session getters', () => {
  describe('loginUserSession', () => {
    it('should call the success handler correctly on success', async () => {
      const params = { userName: 'will@mail.com', password: 'password' } as LoginParams

      mockedSessionService.mockImplementation(() => 'SUCCESS')
      expect(await loginUserSession(params)).toEqual('SUCCESS')
    })

    it('should call the error handler correctly if params are missing', async () => {
      console.error = jest.fn()
      const params = { userName: '', password: '' } as LoginParams
      const error = new Error(errorStrings.USERNAME_PASSWORD_REQUIRED)
      mockedSessionService.mockImplementation(() => 'SUCCESS')
      await loginUserSession(params)
      expect(console.error).toHaveBeenCalledTimes(1)
      expect(console.error).toHaveBeenCalledWith(`${errorStrings.AUTHENTICATION_FAILED}, ${error}`)
    })

    it('should call the error handler correctly if service thows an error', async () => {
      console.error = jest.fn()
      const params = { userName: 'will@mail.com', password: 'password' } as LoginParams

      const error = new Error('API FAILED')
      mockedSessionService.mockImplementation(() => {
        throw error
      })
      await loginUserSession(params)
      expect(console.error).toHaveBeenCalledTimes(1)
      expect(console.error).toHaveBeenCalledWith(`${errorStrings.AUTHENTICATION_FAILED}, ${error}`)
    })
  })

  describe('setUserSession', () => {
    it('should fetch and return a login session', async () => {
      ;(loginUserSession as jest.Mock) = jest.fn().mockReturnValue(mockLoginSession)
      expect(await setUserSession(mockLoginParams)).toEqual(mockLoginSession)
    })

    it('should return null if login fails', async () => {
      ;(loginUserSession as jest.Mock) = jest.fn().mockReturnValue(undefined)
      expect(await setUserSession(mockLoginParams)).toBeNull()
    })
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })
})
