import { useReapitGet } from '@reapit/utils-react'
import React from 'react'
import { mockAppsBrowseState } from '../../../core/__mocks__/use-apps-browse-state'
import { render } from '../../../tests/react-testing'
import { mockAppSummaryModelPagedResult } from '../../../tests/__stubs__/apps'
import { FilteredAppsCollection } from '../filtered-apps'

window.reapit.config.clientHiddenAppIds = {}
window.reapit.config.orgAdminRestrictedAppIds = []

jest.mock('@reapit/connect-session', () => ({
  ReapitConnectBrowserSession: jest.fn(),
  useReapitConnect: jest.fn(() => ({
    connectSession: {
      loginIdentity: {
        clientId: 'MOCK_CLIENT_ID',
        groups: ['OrganisationAdmin'],
      },
    },
  })),
}))

jest.mock('../../../core/use-apps-browse-state')

jest.mock('@reapit/utils-react', () => ({
  useReapitGet: jest.fn(() => [mockAppSummaryModelPagedResult, false]),
  objectToQuery: jest.fn(() => '?query=string'),
}))

const mockUseReapitGet = useReapitGet as jest.Mock

describe('FilteredAppsCollection', () => {
  it('should match a snapshot', () => {
    expect(
      render(<FilteredAppsCollection collectionId={mockAppsBrowseState.appsBrowseConfigState.items[0].id ?? null} />),
    ).toMatchSnapshot()
  })

  it('should match a snapshot when loading', () => {
    mockUseReapitGet.mockReturnValue([null, true])
    expect(
      render(<FilteredAppsCollection collectionId={mockAppsBrowseState.appsBrowseConfigState.items[0].id ?? null} />),
    ).toMatchSnapshot()
  })
})
