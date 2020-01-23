import { refreshUserSession, setRefreshSession } from './refresh-user-session'
import { refreshUserSessionService } from '../services/session/refresh-user-session'
import errorStrings from '../constants/error-strings'
import { RefreshParams } from '../core/types'
import { mockRefreshParams, mockLoginSession } from '../__mocks__/cognito-session'

jest.mock('../services/session/refresh-user-session')
jest.mock('../utils/cognito')

const mockedSessionService = refreshUserSessionService as jest.Mock

describe('refresh session getters', () => {
  describe('refreshUserSession', () => {
    it('should call the success handler correctly on success', async () => {
      const params = { userName: 'will@mail.com', refreshToken: 'SOME_TOKEN' } as RefreshParams

      mockedSessionService.mockImplementation(() => 'SUCCESS')
      expect(await refreshUserSession(params)).toEqual('SUCCESS')
    })

    it('should call the error handler correctly if params are missing', async () => {
      console.error = jest.fn()
      const params = { userName: '', refreshToken: '' } as RefreshParams
      const error = new Error(errorStrings.REFRESH_TOKEN_PASSWORD_REQUIRED)
      mockedSessionService.mockImplementation(() => 'SUCCESS')
      await refreshUserSession(params)

      expect(console.error).toHaveBeenCalledTimes(1)
      expect(console.error).toHaveBeenCalledWith(`${errorStrings.REFRESH_SESSION_FAILED}, ${error}`)
    })

    it('should call the error handler correctly if service thows an error', async () => {
      console.error = jest.fn()
      const params = { userName: 'will@mail.com', refreshToken: 'SOME_TOKEN' } as RefreshParams

      const error = new Error('API FAILED')
      mockedSessionService.mockImplementation(() => {
        throw error
      })
      await refreshUserSession(params)
      expect(console.error).toHaveBeenCalledTimes(1)
      expect(console.error).toHaveBeenCalledWith(`${errorStrings.REFRESH_SESSION_FAILED}, ${error}`)
    })
  })

  describe('setRefreshSession', () => {
    it('should fetch and return a login session', async () => {
      ;(refreshUserSession as jest.Mock) = jest.fn().mockReturnValue(mockLoginSession)
      expect(await setRefreshSession(mockRefreshParams)).toEqual(mockLoginSession)
    })

    it('should return null if login fails', async () => {
      ;(refreshUserSession as jest.Mock) = jest.fn().mockReturnValue(undefined)
      expect(await setRefreshSession(mockRefreshParams)).toBeNull()
    })
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })
})
