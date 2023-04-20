import React from 'react'
import { render } from '../../../tests/react-testing'
import { AppsInstalled } from '../apps-installed'
import { useReapitGet } from '@reapit/use-reapit-data'
import { mockAppSummaryModelPagedResult } from '../../../tests/__stubs__/apps'

process.env.clientHiddenAppIds = {}
process.env.orgAdminRestrictedAppIds = []

jest.mock('@reapit/connect-session', () => ({
  ReapitConnectBrowserSession: jest.fn(),
  useReapitConnect: jest.fn(() => ({
    connectSession: {
      loginIdentity: {
        clientId: 'MOCK_CLIENT_ID',
        groups: ['OrganisationAdmin'],
      },
    },
    connectIsDesktop: false,
  })),
}))

jest.mock('@reapit/use-reapit-data', () => ({
  ...jest.requireActual('@reapit/use-reapit-data'),
  useReapitGet: jest.fn(() => [null, false]),
}))

const mockUseReapitGet = useReapitGet as jest.Mock

describe('AppsInstalled', () => {
  it('should match a snapshot with data', () => {
    mockUseReapitGet.mockReturnValue([mockAppSummaryModelPagedResult, false])

    expect(render(<AppsInstalled />)).toMatchSnapshot()
  })

  it('should match a snapshot when loading', () => {
    mockUseReapitGet.mockReturnValue([null, true])

    expect(render(<AppsInstalled />)).toMatchSnapshot()
  })
})
