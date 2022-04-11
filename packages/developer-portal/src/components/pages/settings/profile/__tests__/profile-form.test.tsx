import React from 'react'
import { ProfileForm, handleRefreshMember } from '../profile-form'
import { render } from '../../../../../tests/react-testing'
import { mockSandboxModelPagedResult } from '../../../../../tests/__stubs__/standboxes'

jest.mock('../../state/use-settings-state')

jest.mock('@reapit/utils-react', () => ({
  useReapitGet: jest.fn(() => [mockSandboxModelPagedResult, true]),
  useReapitUpdate: jest.fn(() => []),
}))

jest.mock('@reapit/connect-session', () => ({
  ReapitConnectBrowserSession: jest.fn(),
  useReapitConnect: jest.fn(() => ({
    connectSession: {
      loginIdentity: {
        agencyCloudId: 'MOCK_AC_ID',
        clientId: 'MOCK_CLIENT_ID',
        orgName: 'MOCK_ORG_NAME',
        groups: ['ReapitUser'],
      },
    },
  })),
}))

describe('ProfileForm', () => {
  it('should match snapshot', () => {
    expect(render(<ProfileForm />)).toMatchSnapshot()
  })
})

describe('handleRefreshMember', () => {
  it('should refresh a member on success', () => {
    const refreshMember = jest.fn()
    const updateMemberSuccess = true

    const curried = handleRefreshMember(refreshMember, updateMemberSuccess)

    curried()

    expect(refreshMember).toHaveBeenCalledTimes(1)
  })
})
