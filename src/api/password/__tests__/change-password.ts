import { Request } from 'express'
import { changePasswordApi } from '../change-password'
import { mockReq, mockRes } from '../../../__mocks__/express'
import { changePasswordService } from '../../../services/password/change-password'
import successHandler from '../../../utils/success-handler'
import errorHandler from '../../../utils/error-handler'
import errorStrings from '../../../constants/error-strings'

jest.mock('../../../services/password/change-password')
jest.mock('../../../utils/success-handler')
jest.mock('../../../utils/error-handler')

const mockedPasswordService = changePasswordService as jest.Mock

describe('changePasswordApi', () => {
  it('should call the success handler correctly on success', async () => {
    const request = {
      ...mockReq,
      body: { userName: 'will@mail.com', password: 'password', newPassword: 'newPassword' }
    } as Request
    mockedPasswordService.mockImplementation(() => 'SUCCESS')
    await changePasswordApi(request, mockRes)
    expect(successHandler).toHaveBeenCalledTimes(1)
    expect(successHandler).toHaveBeenCalledWith(mockRes, 200, mockReq.url, { message: 'SUCCESS' })
  })

  it('should call the error handler correctly if params are missing', async () => {
    const request = {
      ...mockReq,
      body: { userName: null, password: null, newPassword: null }
    } as Request
    mockedPasswordService.mockImplementation(() => 'SUCCESS')
    await changePasswordApi(request, mockRes)
    expect(errorHandler).toHaveBeenCalledTimes(1)
    expect(errorHandler).toHaveBeenCalledWith(mockRes, 400, errorStrings.USERNAME_PASSWORD_NEWPASSWORD_REQUIRED)
  })

  it('should call the error handler correctly if service thows an error', async () => {
    const request = {
      ...mockReq,
      body: { userName: 'will@mail.com', password: 'password', newPassword: 'newPassword' }
    } as Request
    const error = new Error('API FAILED')
    mockedPasswordService.mockImplementation(() => {
      throw error
    })
    await changePasswordApi(request, mockRes)
    expect(errorHandler).toHaveBeenCalledTimes(1)
    expect(errorHandler).toHaveBeenCalledWith(mockRes, 400, `${errorStrings.CHANGE_PASSWORD_FAILED}, ${error}`)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })
})
