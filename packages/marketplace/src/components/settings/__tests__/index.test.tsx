import React from 'react'
import { trackEvent } from '../../../core/analytics'
import { TrackingEvent } from '../../../core/analytics-events'
import { render } from '../../../tests/react-testing'
import { handleLogout, SettingsPage } from '../index'

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

describe('handleLogout', () => {
  it('should handle member update', () => {
    const connectLogoutRedirect = jest.fn()

    const curried = handleLogout(connectLogoutRedirect)

    curried()

    expect(trackEvent).toHaveBeenCalledWith(TrackingEvent.ClickLogoutButton, true)
    expect(connectLogoutRedirect).toHaveBeenCalledTimes(1)
  })
})
