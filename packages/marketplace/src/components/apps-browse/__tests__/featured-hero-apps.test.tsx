import { useReapitGet } from '@reapit/utils-react'
import React from 'react'
import { render } from '../../../tests/react-testing'
import { mockAppDetailModel } from '../../../tests/__stubs__/apps'
import { handleSortConfigs } from '../apps-browse'
import { appsBrowseConfigCollection } from '../../../core/config'
import { FeaturedHeroAppsCollection } from '../featured-hero-apps'

const configItem = handleSortConfigs(appsBrowseConfigCollection)().featuredHeroApps[0]

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

jest.mock('@reapit/utils-react', () => ({
  useReapitGet: jest.fn(() => [mockAppDetailModel, false]),
  objectToQuery: jest.fn(() => '?query=string'),
}))

const mockUseReapitGet = useReapitGet as jest.Mock

describe('FeaturedHeroAppsCollection', () => {
  it('should match a snapshot', () => {
    expect(render(<FeaturedHeroAppsCollection configItem={configItem} />)).toMatchSnapshot()
  })

  it('should match a snapshot when loading', () => {
    mockUseReapitGet.mockReturnValue([null, true])
    expect(render(<FeaturedHeroAppsCollection configItem={configItem} />)).toMatchSnapshot()
  })
})
