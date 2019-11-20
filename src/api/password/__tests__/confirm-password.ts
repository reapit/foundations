import { Request } from 'express'
import { confirmPasswordApi } from '../confirm-password'
import { mockReq, mockRes } from '../../../__mocks__/express'
import { confirmPasswordService } from '../../../services/password/confirm-password'
import successHandler from '../../../utils/success-handler'
import errorHandler from '../../../utils/error-handler'
import errorStrings from '../../../constants/error-strings'

jest.mock('../../../services/password/confirm-password')
jest.mock('../../../utils/success-handler')
jest.mock('../../../utils/error-handler')

const mockedPasswordService = confirmPasswordService as jest.Mock

describe('confirmPasswordApi', () => {
  it('should call the success handler correctly on success', async () => {
    const request = {
      ...mockReq,
      body: { userName: 'will@mail.com', newPassword: 'password', verificationCode: 'verificationCode' }
    } as Request
    mockedPasswordService.mockImplementation(() => 'SUCCESS')
    await confirmPasswordApi(request, mockRes)
    expect(successHandler).toHaveBeenCalledTimes(1)
    expect(successHandler).toHaveBeenCalledWith(mockRes, 200, mockReq.url, { message: 'SUCCESS' })
  })

  it('should call the error handler correctly if params are missing', async () => {
    const request = {
      ...mockReq,
      body: { userName: null, newPassword: null, verificationCode: null }
    } as Request
    mockedPasswordService.mockImplementation(() => 'SUCCESS')
    await confirmPasswordApi(request, mockRes)
    expect(errorHandler).toHaveBeenCalledTimes(1)
    expect(errorHandler).toHaveBeenCalledWith(mockRes, 400, errorStrings.USERNAME_CODE_NEWPASSWORD_REQUIRED)
  })

  it('should call the error handler correctly if service thows an error', async () => {
    const request = {
      ...mockReq,
      body: { userName: 'will@mail.com', newPassword: 'password', verificationCode: 'verificationCode' }
    } as Request
    const error = new Error('API FAILED')
    mockedPasswordService.mockImplementation(() => {
      throw error
    })
    await confirmPasswordApi(request, mockRes)
    expect(errorHandler).toHaveBeenCalledTimes(1)
    expect(errorHandler).toHaveBeenCalledWith(mockRes, 400, `${errorStrings.CONFIRM_PASSWORD_FAILED} ${error.message}`)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })
})
