import { confirmRegistration } from '../confirm-registration'
import { confirmRegistrationService } from '../../../services/registration/confirm-registration'
import errorStrings from '../../../constants/error-strings'
import { ConfirmRegistrationParams } from '../../../core/types'

jest.mock('../../../services/registration/confirm-registration')

const mockedPasswordService = confirmRegistrationService as jest.Mock

describe('confirmRegistration', () => {
  it('should call the success handler correctly on success', async () => {
    const params = { userName: 'will@mail.com', verificationCode: 'verificationCode' } as ConfirmRegistrationParams

    mockedPasswordService.mockImplementation(() => 'SUCCESS')
    expect(await confirmRegistration(params)).toEqual('SUCCESS')
  })

  it('should call the error handler correctly if params are missing', async () => {
    console.error = jest.fn()
    const params = { userName: '', newPassword: '', verificationCode: '' } as ConfirmRegistrationParams
    const error = new Error(errorStrings.USERNAME_CODE_REQUIRED)
    mockedPasswordService.mockImplementation(() => 'SUCCESS')
    await confirmRegistration(params)
    expect(console.error).toHaveBeenCalledTimes(1)
    expect(console.error).toHaveBeenCalledWith(`${errorStrings.CONFIRM_REGISTRATION_FAILED}, ${error}`)
  })

  it('should call the error handler correctly if service thows an error', async () => {
    console.error = jest.fn()
    const params = { userName: 'will@mail.com', verificationCode: 'verificationCode' } as ConfirmRegistrationParams

    const error = new Error('API FAILED')
    mockedPasswordService.mockImplementation(() => {
      throw error
    })
    await confirmRegistration(params)
    expect(console.error).toHaveBeenCalledTimes(1)
    expect(console.error).toHaveBeenCalledWith(`${errorStrings.CONFIRM_REGISTRATION_FAILED}, ${error}`)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })
})
