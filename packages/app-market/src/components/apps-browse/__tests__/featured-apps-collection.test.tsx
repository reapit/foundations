import { useReapitGet } from '@reapit/utils-react'
import React from 'react'
import { render } from '../../../tests/react-testing'
import { mockAppSummaryModelPagedResult } from '../../../tests/__stubs__/apps'
import { handleSortConfigs } from '../apps-browse'
import { appsBrowseConfigCollection } from '../config'
import { FeaturedAppsCollection } from '../featured-apps-collection'

const configItem = handleSortConfigs(appsBrowseConfigCollection)().featuredApps[0]

jest.mock('@reapit/utils-react', () => ({
  useReapitGet: jest.fn(() => [mockAppSummaryModelPagedResult, false]),
  objectToQuery: jest.fn(() => '?query=string'),
}))

const mockUseReapitGet = useReapitGet as jest.Mock

describe('FeaturedAppsCollection', () => {
  it('should match a snapshot', () => {
    expect(render(<FeaturedAppsCollection configItem={configItem} />)).toMatchSnapshot()
  })

  it('should match a snapshot when loading', () => {
    mockUseReapitGet.mockReturnValue([null, true])
    expect(render(<FeaturedAppsCollection configItem={configItem} />)).toMatchSnapshot()
  })
})
