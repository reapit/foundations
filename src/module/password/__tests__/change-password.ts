import { Request } from 'express'
import { changePassword } from '../change-password'
import { mockReq, mockRes } from '../../../__mocks__/express'
import { changePasswordService } from '../../../services/password/change-password'
import successHandler from '../../../utils/success-handler'
import errorHandler from '../../../utils/error-handler'
import errorStrings from '../../../constants/error-strings'
import { ChangePasswordParams } from '../../../core/types'

jest.mock('../../../services/password/change-password')
jest.mock('../../../utils/success-handler')
jest.mock('../../../utils/error-handler')

const mockedPasswordService = changePasswordService as jest.Mock

describe('changePassword', () => {
  it('should call the success handler correctly on success', async () => {
    const params = {
      userName: 'will@mail.com',
      password: 'password',
      newPassword: 'newPassword'
    } as ChangePasswordParams

    mockedPasswordService.mockImplementation(() => 'SUCCESS')
    expect(await changePassword(params)).toEqual('SUCCESS')
  })

  it('should call the error handler correctly if params are missing', async () => {
    console.error = jest.fn()
    const params = { userName: '', password: '', newPassword: '' } as ChangePasswordParams
    const error = new Error(errorStrings.USERNAME_PASSWORD_NEWPASSWORD_REQUIRED)
    mockedPasswordService.mockImplementation(() => 'SUCCESS')
    await changePassword(params)

    expect(console.error).toHaveBeenCalledTimes(1)
    expect(console.error).toHaveBeenCalledWith(`${errorStrings.CHANGE_PASSWORD_FAILED}, ${error}`)
  })

  it('should call the error handler correctly if service thows an error', async () => {
    console.error = jest.fn()
    const params = {
      userName: 'will@mail.com',
      password: 'password',
      newPassword: 'newPassword'
    } as ChangePasswordParams

    const error = new Error('API FAILED')
    mockedPasswordService.mockImplementation(() => {
      throw error
    })
    await changePassword(params)
    expect(console.error).toHaveBeenCalledTimes(1)
    expect(console.error).toHaveBeenCalledWith(`${errorStrings.CHANGE_PASSWORD_FAILED}, ${error}`)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })
})
