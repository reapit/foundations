import { Request } from 'express'
import { resetPassword } from '../reset-password'
import { mockReq, mockRes } from '../../../__mocks__/express'
import { resetPasswordService } from '../../../services/password/reset-password'
import successHandler from '../../../utils/success-handler'
import errorHandler from '../../../utils/error-handler'
import errorStrings from '../../../constants/error-strings'
import { ResetPasswordParams } from '../../../core/types'

jest.mock('../../../services/password/reset-password')
jest.mock('../../../utils/success-handler')
jest.mock('../../../utils/error-handler')

const mockedPasswordService = resetPasswordService as jest.Mock

describe('resetPassword', () => {
  it('should call the success handler correctly on success', async () => {
    const params = { userName: 'will@mail.com' } as ResetPasswordParams

    mockedPasswordService.mockImplementation(() => 'SUCCESS')
    expect(await resetPassword(params)).toEqual('SUCCESS')
  })

  it('should call the error handler correctly if params are missing', async () => {
    console.error = jest.fn()
    const params = { userName: '' } as ResetPasswordParams
    const error = new Error(errorStrings.USERNAME_REQUIRED)
    mockedPasswordService.mockImplementation(() => 'SUCCESS')
    await resetPassword(params)
    expect(console.error).toHaveBeenCalledTimes(1)
    expect(console.error).toHaveBeenCalledWith(`${errorStrings.RESET_PASSWORD_FAILED}, ${error}`)
  })

  it('should call the error handler correctly if service thows an error', async () => {
    console.error = jest.fn()
    const params = { userName: 'will@mail.com' } as ResetPasswordParams
    const error = new Error('API FAILED')
    mockedPasswordService.mockImplementation(() => {
      throw error
    })
    await resetPassword(params)
    expect(console.error).toHaveBeenCalledTimes(1)
    expect(console.error).toHaveBeenCalledWith(`${errorStrings.RESET_PASSWORD_FAILED}, ${error}`)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })
})
