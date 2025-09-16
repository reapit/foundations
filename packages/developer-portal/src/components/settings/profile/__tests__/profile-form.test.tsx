import React from 'react'
import { ProfileForm, handleRefreshMember } from '../profile-form'
import { render } from '../../../../tests/react-testing'
import { mockSandboxModelPagedResult } from '../../../../tests/__stubs__/standboxes'
import { mockDeveloperModel } from '../../../../tests/__stubs__/developers'

jest.mock('../../../../core/use-global-state')

jest.mock('@reapit/use-reapit-data', () => ({
  ...jest.requireActual('@reapit/use-reapit-data'),
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
  process.env.swaggerWhitelist = [mockDeveloperModel.id] as any

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
