import { Request } from 'express'
import { refreshUserSessionApi } from '../refresh-user-session'
import { mockReq, mockRes } from '../../../__mocks__/express'
import { refreshUserSessionService } from '../../../services/session/refresh-user-session'
import successHandler from '../../../utils/success-handler'
import errorHandler from '../../../utils/error-handler'
import errorStrings from '../../../constants/error-strings'

jest.mock('../../../services/session/refresh-user-session')
jest.mock('../../../utils/success-handler')
jest.mock('../../../utils/error-handler')

const mockedSessionService = refreshUserSessionService as jest.Mock

describe('refreshUserSessionApi', () => {
  it('should call the success handler correctly on success', async () => {
    const request = {
      ...mockReq,
      body: { userName: 'will@mail.com', refreshToken: 'SOME_TOKEN' }
    } as Request
    mockedSessionService.mockImplementation(() => 'SUCCESS')
    await refreshUserSessionApi(request, mockRes)
    expect(successHandler).toHaveBeenCalledTimes(1)
    expect(successHandler).toHaveBeenCalledWith(mockRes, 200, mockReq.url, 'SUCCESS')
  })

  it('should call the error handler correctly if params are missing', async () => {
    const request = {
      ...mockReq,
      body: { userName: null, password: null }
    } as Request
    mockedSessionService.mockImplementation(() => 'SUCCESS')
    await refreshUserSessionApi(request, mockRes)
    expect(errorHandler).toHaveBeenCalledTimes(1)
    expect(errorHandler).toHaveBeenCalledWith(mockRes, 400, errorStrings.REFRESH_TOKEN_PASSWORD_REQUIRED)
  })

  it('should call the error handler correctly if service thows an error', async () => {
    const request = {
      ...mockReq,
      body: { userName: 'will@mail.com', refreshToken: 'SOME_TOKEN' }
    } as Request
    const error = new Error('API FAILED')
    mockedSessionService.mockImplementation(() => {
      throw error
    })
    await refreshUserSessionApi(request, mockRes)
    expect(errorHandler).toHaveBeenCalledTimes(1)
    expect(errorHandler).toHaveBeenCalledWith(mockRes, 400, `${errorStrings.REFRESH_SESSION_FAILED}, ${error}`)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })
})
