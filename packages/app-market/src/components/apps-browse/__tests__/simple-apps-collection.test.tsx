import { useReapitGet } from '@reapit/utils-react'
import React from 'react'
import { render } from '../../../tests/react-testing'
import { mockAppSummaryModelPagedResult } from '../../../tests/__stubs__/apps'
import { handleSortConfigs } from '../apps-browse'
import { appsBrowseConfigCollection } from '../../../core/config'
import { SimpleAppsCollection } from '../simple-apps-collection'

const configItem = handleSortConfigs(appsBrowseConfigCollection)().simpleApps[0]

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
    connectIsDesktop: false,
  })),
}))

jest.mock('@reapit/utils-react', () => ({
  useReapitGet: jest.fn(() => [mockAppSummaryModelPagedResult, false]),
  objectToQuery: jest.fn(() => '?query=string'),
}))

const mockUseReapitGet = useReapitGet as jest.Mock

describe('SimpleAppsCollection', () => {
  it('should match a snapshot', () => {
    expect(render(<SimpleAppsCollection configItem={configItem} />)).toMatchSnapshot()
  })

  it('should match a snapshot when loading', () => {
    mockUseReapitGet.mockReturnValue([null, true])
    expect(render(<SimpleAppsCollection configItem={configItem} />)).toMatchSnapshot()
  })
})
