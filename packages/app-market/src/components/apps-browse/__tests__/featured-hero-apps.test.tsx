import { useReapitGet } from '@reapit/utils-react'
import React from 'react'
import { render } from '../../../tests/react-testing'
import { handleSortConfigs } from '../apps-browse'
import { appsBrowseConfigCollection } from '../config'
import { FeaturedHeroAppsCollection } from '../featured-hero-apps'

const configItem = handleSortConfigs(appsBrowseConfigCollection)().featuredHeroApps[0]

jest.mock('@reapit/utils-react', () => ({
  useReapitGet: jest.fn(() => [{}, false]),
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
