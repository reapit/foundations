import React from 'react'
import { render, setViewport } from '../../../tests/react-testing'
import { SettingsProfile, handleChangePassword, handleUserUpdate } from '../settings-profile'
import { changePasswordService } from '../../../services/cognito-identity'
import { UseSnack } from '@reapit/elements'
import { TrackingEvent } from '../../../core/analytics-events'
import { trackEvent } from '../../../core/analytics'
import { mockUserModel } from '../../../tests/__stubs__/user'
import { SendFunction } from '@reapit/use-reapit-data'
import { UpdateUserModel } from '@reapit/foundations-ts-definitions'

jest.mock('../../../core/use-apps-browse-state')
jest.mock('../../../core/analytics')
jest.mock('../../../services/cognito-identity', () => ({
  changePasswordService: jest.fn(),
}))
jest.mock('@reapit/connect-session', () => ({
  ReapitConnectBrowserSession: jest.fn(),
  useReapitConnect: jest.fn(() => ({
    connectSession: {
      loginIdentity: {
        offGrouping: true,
        clientId: 'MOCK_CLIENT_ID',
        groups: ['OrganisationAdmin'],
        name: 'MOCK_NAME',
        email: 'foo@example.com',
        orgName: 'MOCK_ORG_NAME',
      },
    },
  })),
}))

const mockChangePasswordService = changePasswordService as jest.Mock

describe('SettingsProfile', () => {
  it('should match snapshot', () => {
    expect(render(<SettingsProfile />)).toMatchSnapshot()
  })

  it('should match snapshot in mobile', () => {
    setViewport('mobile')
    expect(render(<SettingsProfile />)).toMatchSnapshot()
  })
})

describe('handleChangePassword', () => {
  it('should successfully change the password', async () => {
    mockChangePasswordService.mockReturnValue(true)
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

    expect(trackEvent).toHaveBeenCalledWith(TrackingEvent.ChangePassword, true)
    expect(snack.error).not.toHaveBeenCalled()
    expect(snack.success).toHaveBeenCalledTimes(1)
  })

  it('should throw an error if the change password service fails', async () => {
    mockChangePasswordService.mockReturnValue(false)
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

describe('handleUserUpdate', () => {
  it('should handle updating a user', async () => {
    const updateUser = jest.fn(() => true) as unknown as SendFunction<UpdateUserModel, boolean>
    const currentUserState = mockUserModel
    const refreshCurrentUser = jest.fn()
    const curried = handleUserUpdate(updateUser, currentUserState, refreshCurrentUser)

    await curried()

    expect(updateUser).toHaveBeenCalledWith({ ...mockUserModel, consentToTrack: false })
    expect(refreshCurrentUser).toHaveBeenCalledTimes(1)
  })
})
