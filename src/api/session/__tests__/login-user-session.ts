import { Request } from 'express'
import { loginUserSessionApi } from '../login-user-session'
import { mockReq, mockRes } from '../../../__mocks__/express'
import { loginUserSessionService } from '../../../services/session/login-user-session'
import successHandler from '../../../utils/success-handler'
import errorHandler from '../../../utils/error-handler'
import errorStrings from '../../../constants/error-strings'

jest.mock('../../../services/session/login-user-session')
jest.mock('../../../utils/success-handler')
jest.mock('../../../utils/error-handler')

const mockedSessionService = loginUserSessionService as jest.Mock

describe('loginUserSessionApi', () => {
  it('should call the success handler correctly on success', async () => {
    const request = {
      ...mockReq,
      body: { userName: 'will@mail.com', password: 'password' }
    } as Request
    mockedSessionService.mockImplementation(() => 'SUCCESS')
    await loginUserSessionApi(request, mockRes)
    expect(successHandler).toHaveBeenCalledTimes(1)
    expect(successHandler).toHaveBeenCalledWith(mockRes, 200, mockReq.url, 'SUCCESS')
  })

  it('should call the error handler correctly if params are missing', async () => {
    const request = {
      ...mockReq,
      body: { userName: null, password: null }
    } as Request
    mockedSessionService.mockImplementation(() => 'SUCCESS')
    await loginUserSessionApi(request, mockRes)
    expect(errorHandler).toHaveBeenCalledTimes(1)
    expect(errorHandler).toHaveBeenCalledWith(mockRes, 400, errorStrings.USERNAME_PASSWORD_REQUIRED)
  })

  it('should call the error handler correctly if service thows an error', async () => {
    const request = {
      ...mockReq,
      body: { userName: 'will@mail.com', password: 'password' }
    } as Request
    const error = new Error('API FAILED')
    mockedSessionService.mockImplementation(() => {
      throw error
    })
    await loginUserSessionApi(request, mockRes)
    expect(errorHandler).toHaveBeenCalledTimes(1)
    expect(errorHandler).toHaveBeenCalledWith(mockRes, 400, `${errorStrings.AUTHENTICATION_FAILED} ${error.message}`)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })
})
