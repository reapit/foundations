import { useReapitGet } from '@reapit/utils-react'
import React from 'react'
import { render } from '../../../tests/react-testing'
import { mockAppDetailModel } from '../../../tests/__stubs__/apps'
import { handleSortConfigs } from '../apps-browse'
import { appsBrowseConfigCollection } from '../config'
import { HeroAppsCollection } from '../hero-apps'

const configItem = handleSortConfigs(appsBrowseConfigCollection)().heroApps[0]

jest.mock('@reapit/utils-react', () => ({
  useReapitGet: jest.fn(() => [mockAppDetailModel, false]),
  objectToQuery: jest.fn(() => '?query=string'),
}))

const mockUseReapitGet = useReapitGet as jest.Mock

describe('HeroAppsCollection', () => {
  it('should match a snapshot', () => {
    expect(render(<HeroAppsCollection configItem={configItem} />)).toMatchSnapshot()
  })

  it('should match a snapshot when loading', () => {
    mockUseReapitGet.mockReturnValue([null, true])
    expect(render(<HeroAppsCollection configItem={configItem} />)).toMatchSnapshot()
  })
})
