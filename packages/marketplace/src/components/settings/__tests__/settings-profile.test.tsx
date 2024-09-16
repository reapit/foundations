import React from 'react'
import { render, setViewport } from '../../../tests/react-testing'
import { SettingsProfile, handleUserUpdate } from '../settings-profile'
import { mockUserModel } from '../../../tests/__stubs__/user'
import { SendFunction } from '@reapit/use-reapit-data'
import { UpdateUserModel } from '@reapit/foundations-ts-definitions'

jest.mock('../../../core/use-apps-browse-state')
jest.mock('../../../core/analytics')
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

describe('SettingsProfile', () => {
  it('should match snapshot', () => {
    expect(render(<SettingsProfile />)).toMatchSnapshot()
  })

  it('should match snapshot in mobile', () => {
    setViewport('mobile')
    expect(render(<SettingsProfile />)).toMatchSnapshot()
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
