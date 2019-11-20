import { Request } from 'express'
import { resetPasswordApi } from '../reset-password'
import { mockReq, mockRes } from '../../../__mocks__/express'
import { resetPasswordService } from '../../../services/password/reset-password'
import successHandler from '../../../utils/success-handler'
import errorHandler from '../../../utils/error-handler'
import errorStrings from '../../../constants/error-strings'

jest.mock('../../../services/password/reset-password')
jest.mock('../../../utils/success-handler')
jest.mock('../../../utils/error-handler')

const mockedPasswordService = resetPasswordService as jest.Mock

describe('resetPasswordApi', () => {
  it('should call the success handler correctly on success', async () => {
    const request = {
      ...mockReq,
      body: { userName: 'will@mail.com' }
    } as Request
    mockedPasswordService.mockImplementation(() => 'SUCCESS')
    await resetPasswordApi(request, mockRes)
    expect(successHandler).toHaveBeenCalledTimes(1)
    expect(successHandler).toHaveBeenCalledWith(mockRes, 200, mockReq.url, 'SUCCESS')
  })

  it('should call the error handler correctly if params are missing', async () => {
    const request = {
      ...mockReq,
      body: { userName: null }
    } as Request
    mockedPasswordService.mockImplementation(() => 'SUCCESS')
    await resetPasswordApi(request, mockRes)
    expect(errorHandler).toHaveBeenCalledTimes(1)
    expect(errorHandler).toHaveBeenCalledWith(mockRes, 400, errorStrings.USERNAME_REQUIRED)
  })

  it('should call the error handler correctly if service thows an error', async () => {
    const request = {
      ...mockReq,
      body: { userName: 'will@mail.com' }
    } as Request
    const error = new Error('API FAILED')
    mockedPasswordService.mockImplementation(() => {
      throw error
    })
    await resetPasswordApi(request, mockRes)
    expect(errorHandler).toHaveBeenCalledTimes(1)
    expect(errorHandler).toHaveBeenCalledWith(mockRes, 400, `${errorStrings.RESET_PASSWORD_FAILED} ${error.message}`)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })
})
