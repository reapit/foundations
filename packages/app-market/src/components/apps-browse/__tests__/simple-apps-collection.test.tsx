import { useReapitGet } from '@reapit/utils-react'
import React from 'react'
import { render } from '../../../tests/react-testing'
import { handleSortConfigs } from '../apps-browse'
import { appsBrowseConfigCollection } from '../config'
import { SimpleAppsCollection } from '../simple-apps-collection'

const configItem = handleSortConfigs(appsBrowseConfigCollection)().simpleApps[0]

jest.mock('@reapit/utils-react', () => ({
  useReapitGet: jest.fn(() => [{}, false]),
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
