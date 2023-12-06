import React from 'react'
import { render } from '../../../tests/react-testing'
import { SettingsPage } from '../index'

process.env.clientHiddenAppIds = {}
process.env.orgAdminRestrictedAppIds = []

jest.mock('../../../core/analytics')
jest.mock('@reapit/connect-session', () => ({
  ReapitConnectBrowserSession: jest.fn(),
  useReapitConnect: jest.fn(() => ({
    connectSession: {
      loginIdentity: {
        offGrouping: true,
        clientId: 'MOCK_CLIENT_ID',
        groups: ['OrganisationAdmin'],
      },
    },
    connectIsDesktop: false,
  })),
}))

describe('SettingsPage', () => {
  it('should match a snapshot', () => {
    expect(render(<SettingsPage />)).toMatchSnapshot()
  })
})
