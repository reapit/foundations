import { confirmPassword } from './confirm-password'
import { confirmPasswordService } from '../services/password/confirm-password'
import errorStrings from '../constants/error-strings'
import { ConfirmPasswordParams } from '../core/types'

jest.mock('../services/password/confirm-password')

const mockedPasswordService = confirmPasswordService as jest.Mock

describe('confirmPassword', () => {
  it('should call the success handler correctly on success', async () => {
    const params = {
      userName: 'will@mail.com',
      newPassword: 'password',
      verificationCode: 'verificationCode'
    } as ConfirmPasswordParams
    mockedPasswordService.mockImplementation(() => 'SUCCESS')
    expect(await confirmPassword(params)).toEqual('SUCCESS')
  })

  it('should call the error handler correctly if params are missing', async () => {
    console.error = jest.fn()
    const params = { userName: '', newPassword: '', verificationCode: '' } as ConfirmPasswordParams
    const error = new Error(errorStrings.USERNAME_CODE_NEWPASSWORD_REQUIRED)
    mockedPasswordService.mockImplementation(() => 'SUCCESS')
    await confirmPassword(params)
    expect(console.error).toHaveBeenCalledTimes(1)
    expect(console.error).toHaveBeenCalledWith(`${errorStrings.CONFIRM_PASSWORD_FAILED}, ${error}`)
  })

  it('should call the error handler correctly if service throws an error', async () => {
    console.error = jest.fn()
    const params = {
      userName: 'will@mail.com',
      newPassword: 'password',
      verificationCode: 'verificationCode'
    } as ConfirmPasswordParams
    const error = new Error('API FAILED')
    mockedPasswordService.mockImplementation(() => {
      throw error
    })
    await confirmPassword(params)
    expect(console.error).toHaveBeenCalledTimes(1)
    expect(console.error).toHaveBeenCalledWith(`${errorStrings.CONFIRM_PASSWORD_FAILED}, ${error}`)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })
})
