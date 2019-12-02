import { Request } from 'express'
import { confirmRegistrationApi } from '../confirm-registration'
import { mockReq, mockRes } from '../../../__mocks__/express'
import { confirmRegistrationService } from '../../../services/registration/confirm-registration'
import successHandler from '../../../utils/success-handler'
import errorHandler from '../../../utils/error-handler'
import errorStrings from '../../../constants/error-strings'

jest.mock('../../../services/registration/confirm-registration')
jest.mock('../../../utils/success-handler')
jest.mock('../../../utils/error-handler')

const mockedPasswordService = confirmRegistrationService as jest.Mock

describe('confirmRegistrationApi', () => {
  it('should call the success handler correctly on success', async () => {
    const request = {
      ...mockReq,
      body: { userName: 'will@mail.com', verificationCode: 'verificationCode' }
    } as Request
    mockedPasswordService.mockImplementation(() => 'SUCCESS')
    await confirmRegistrationApi(request, mockRes)
    expect(successHandler).toHaveBeenCalledTimes(1)
    expect(successHandler).toHaveBeenCalledWith(mockRes, 200, mockReq.url, { message: 'SUCCESS' })
  })

  it('should call the error handler correctly if params are missing', async () => {
    const request = {
      ...mockReq,
      body: { userName: null, newPassword: null, verificationCode: null }
    } as Request
    mockedPasswordService.mockImplementation(() => 'SUCCESS')
    await confirmRegistrationApi(request, mockRes)
    expect(errorHandler).toHaveBeenCalledTimes(1)
    expect(errorHandler).toHaveBeenCalledWith(mockRes, 400, errorStrings.USERNAME_CODE_REQUIRED)
  })

  it('should call the error handler correctly if service thows an error', async () => {
    const request = {
      ...mockReq,
      body: { userName: 'will@mail.com', verificationCode: 'verificationCode' }
    } as Request
    const error = new Error('API FAILED')
    mockedPasswordService.mockImplementation(() => {
      throw error
    })
    await confirmRegistrationApi(request, mockRes)
    expect(errorHandler).toHaveBeenCalledTimes(1)
    expect(errorHandler).toHaveBeenCalledWith(mockRes, 400, `${errorStrings.CONFIRM_REGISTRATION_FAILED}, ${error}`)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })
})
