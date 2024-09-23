import React from 'react'
import { ChangePasswordForm, handleChangePassword } from '../change-password-form'
import { render } from '../../../../tests/react-testing'
import { changePasswordService } from '../../../../services/cognito-identity'
import { UseSnack } from '@reapit/elements'
import { getTokenIssuer, tokenFromCognito } from '../../../../utils/token'

jest.mock('../../../../services/cognito-identity', () => ({
  changePasswordService: jest.fn(),
}))

jest.mock('../../../../utils/token', () => ({
  tokenFromCognito: jest.fn(),
  getTokenIssuer: jest.fn(),
}))

const mockChangePasswordService = changePasswordService as jest.Mock
const mockTokenUtil = tokenFromCognito as jest.Mock
const mockGetTokenIssuer = getTokenIssuer as jest.Mock

describe('ChangePasswordForm', () => {
  beforeEach(() => {
    mockGetTokenIssuer.mockReturnValue('https://connect.dev.paas.reapit.cloud/')
  })

  it('should match snapshot', () => {
    expect(render(<ChangePasswordForm />)).toMatchSnapshot()
  })
})

describe('handleChangePassword', () => {
  beforeEach(() => {
    mockGetTokenIssuer.mockReturnValue('https://connect.dev.paas.reapit.cloud/')
  })

  it('should successfully change the password', async () => {
    mockChangePasswordService.mockReturnValue(true)
    mockTokenUtil.mockReturnValue(true)
    const email = 'MOCK_EMAIL'
    const snack = {
      success: jest.fn(),
      error: jest.fn(),
    } as unknown as UseSnack
    const formValues = {
      password: 'MOCK_PASSWORD',
      newPassword: 'MOCK_NEW_PASSWORD',
      confirmPassword: 'MOCK_NEW_PASSWORD',
    }

    const curried = handleChangePassword(email, snack)

    await curried(formValues)

    expect(mockChangePasswordService).toHaveBeenCalledWith({
      password: formValues.password,
      newPassword: formValues.newPassword,
      userName: email,
    })

    expect(snack.error).not.toHaveBeenCalled()
    expect(snack.success).toHaveBeenCalledTimes(1)
  })

  it('should throw an error if the change password service fails', async () => {
    mockChangePasswordService.mockReturnValue(false)
    mockTokenUtil.mockReturnValue(true)
    const email = 'MOCK_EMAIL'
    const snack = {
      success: jest.fn(),
      error: jest.fn(),
    } as unknown as UseSnack
    const formValues = {
      password: 'MOCK_PASSWORD',
      newPassword: 'MOCK_NEW_PASSWORD',
      confirmPassword: 'MOCK_NEW_PASSWORD',
    }

    const curried = handleChangePassword(email, snack)

    await curried(formValues)

    expect(mockChangePasswordService).toHaveBeenCalledWith({
      password: formValues.password,
      newPassword: formValues.newPassword,
      userName: email,
    })

    expect(snack.error).toHaveBeenCalledTimes(1)
    expect(snack.success).not.toHaveBeenCalled()
  })
})
